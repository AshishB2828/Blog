using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Service.ServiceContracts;
using System.IO;

namespace Blog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {

        private readonly IBlogServices _blogServices;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public BlogController(IBlogServices blogServices, UserManager<ApplicationUser> userManager, IWebHostEnvironment webHostEnvironment)
        {
            _blogServices = blogServices;
            _userManager = userManager;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet("All")]
        [Authorize]
        public async Task<List<BlogResponse>> GetAllBlogs()
        {
            var blogData =  await _blogServices.GetAllBlogs();
            foreach (var item in blogData)
            {
                item.ImageURL = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, item.ImageURL);
            }
            return blogData;
        }

        [HttpGet("get/{id:int}")]
        [Authorize]
        public async Task<BlogResponse> GetPost(int id)
        {
            var blog =  await _blogServices.GetPostById(id);

            blog.ImageURL = String.Format("{0}://{1}{2}/images/{3}", Request.Scheme, Request.Host, Request.PathBase, blog.ImageURL);
            return blog;
        }

        [HttpPost("create")]
        [Authorize]
        //[ProducesResponseType(201)]
        public async Task<ActionResult<BlogCreateDto>> Create([FromForm]BlogCreateDto blogData, [FromForm]IFormFile file)
        {
            var user = await _userManager.FindByNameAsync(User.Identity?.Name);

            var fileName = await SaveImage(file);
            blogData.ImageURL = fileName;
            var blog = await _blogServices.CreateBlog(blogData, user.Id);
            return StatusCode(201, blog);
        }


        [HttpPost("Update")]
        [Authorize]
        //[ProducesResponseType(201)]
        public async Task<ActionResult<BlogUpdateDto>> Update([FromForm] BlogUpdateDto blogData, [FromForm] IFormFile? file)
        {
            if (file != null)
            {
                if(!string.IsNullOrEmpty(blogData.ImageURL))
                    DeleteImage(blogData.ImageURL); //imageUrl == image name
                var fileName = await SaveImage(file);
                blogData.ImageURL = fileName;
            }
            var user = await _userManager.FindByNameAsync(User.Identity?.Name);
            var blog = await _blogServices.UpdateBlog(blogData, user.Id);
            return StatusCode(201, blog);
        }

        [NonAction]
        public async Task<string> SaveImage(IFormFile imageFile)
        {

            string imageName = new String(Path
                    .GetFileNameWithoutExtension(imageFile.FileName)
                    .Take(10).ToArray()).Replace(" ", "-");
            imageName = imageName + DateTime.Now.ToString("yymmssfff") +
                Path.GetExtension(imageFile.FileName);

            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "images", imageName);

            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }

            return imageName;
        }

        [NonAction]
        public void DeleteImage(string imageName)
        {

            var imagePath = Path.Combine(_webHostEnvironment.ContentRootPath, "images", imageName);
            if (System.IO.File.Exists(imagePath))
                System.IO.File.Delete(imagePath);
        }

    }
}
