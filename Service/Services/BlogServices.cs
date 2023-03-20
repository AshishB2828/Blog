using Entities.DataAccess;
using Entities.DTO;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Service.ServiceContracts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class BlogServices : IBlogServices
    {

        private readonly ApplicationDbContext _blogContext;
        public BlogServices(ApplicationDbContext blogContext)
        {
            _blogContext = blogContext;
        }

        public async Task<BlogResponse> CreateBlog(BlogCreateDto blogCreateDto, int currentUserId)
        {
            //Validations
            var blog = new Blog 
            {
                Title = blogCreateDto.Title,
                Content = blogCreateDto.Content,
                CreatedAt = DateTime.Now,
                CreatedBy = currentUserId,
                Summary = blogCreateDto.Summary,
                ImageUrl = blogCreateDto.ImageURL ?? ""
            };

            await _blogContext.Blogs.AddAsync(blog);
            await _blogContext.SaveChangesAsync();
            return new BlogResponse
            {
                Title = blog.Title,
                Content = blog.Content,
                CreatedAt =blog.CreatedAt.ToString("dd/MM/yyyy"),
                CreatedBy = currentUserId,
                Summary = blog.Summary,
                ImageURL = blog.ImageUrl ?? "",
                Id = blog.Id
            };

        }

        public async Task<bool> DeletePostById(int id, int userId)
        {
            var blogInDb = await _blogContext.Blogs.FirstOrDefaultAsync(i => i.Id == id);
            if (blogInDb == null) return false;
            if (blogInDb.CreatedBy != userId) return false;
             _blogContext.Blogs.Remove(blogInDb);
             await _blogContext.SaveChangesAsync();
            return true;
        }

        public async Task<List<BlogResponse>> GetAllBlogs(int page)
        {
            var perPageContent = 2;
            var blogs = await _blogContext.Blogs
                                .Take(page * perPageContent)
                                .Include(b => b.CreatedByUser)
                                .Select(blog => new BlogResponse
                                {
                                    Title = blog.Title,
                                    Content = blog.Content,
                                    CreatedAt = blog.CreatedAt.ToString("dd/MM/yyyy"),
                                    CreatedBy = blog.CreatedBy,
                                    Summary = blog.Summary,
                                    ImageURL = blog.ImageUrl ?? "",
                                    Id = blog.Id,
                                    CreatedByName = blog.CreatedByUser.Email
                                })
                                .ToListAsync();
            return blogs;
        }

        public async Task<BlogResponse> GetPostById(int id)
        {
            var blog = await _blogContext.Blogs
                                
                                .Include(b => b.CreatedByUser)
                                .Select(blog => new BlogResponse
                                {
                                    Title = blog.Title,
                                    Content = blog.Content,
                                    CreatedAt = blog.CreatedAt.ToString("dd/MM/yyyy"),
                                    CreatedBy = blog.CreatedBy,
                                    Summary = blog.Summary,
                                    ImageURL = blog.ImageUrl ?? "",
                                    Id = blog.Id,
                                    CreatedByName = blog.CreatedByUser.Email
                                })
                                .FirstOrDefaultAsync(i => i.Id == id);
            return blog;
        }

        public async Task<BlogResponse> UpdateBlog(BlogUpdateDto blogUpdate, int currentUserId)
        {


            var blogInDb =  await  _blogContext.Blogs.FirstOrDefaultAsync(i => i.Id == blogUpdate.Id);
            if (blogInDb == null) return null;
            if (blogInDb.CreatedBy != currentUserId) return null; 
            blogInDb.Title = blogUpdate.Title;
            blogInDb.Summary = blogUpdate.Summary;
            blogInDb.Content = blogUpdate.Content;
            blogInDb.ImageUrl = blogUpdate.ImageURL ?? blogInDb.ImageUrl;


            await _blogContext.SaveChangesAsync();
            return new BlogResponse
            {
                Title = blogInDb.Title,
                Content = blogInDb.Content,
                CreatedAt = blogInDb.CreatedAt.ToString("dd/MM/yyyy"),
                CreatedBy = blogInDb.CreatedBy,
                Summary = blogInDb.Summary,
                ImageURL = blogInDb.ImageUrl ?? "",
                Id = blogInDb.Id
            };
        }


        public async Task<List<BlogResponse>> PostByPersonId(int userId, int page)
        {
            var perPage = 2;
            var blogs = await _blogContext.Blogs
                .Take(page * perPage)
                                .Where(b => b.CreatedBy == userId)
                                .Include(b => b.CreatedByUser)
                                .Select(blog => new BlogResponse
                                {
                                    Title = blog.Title,
                                    Content = blog.Content,
                                    CreatedAt = blog.CreatedAt.ToString("dd/MM/yyyy"),
                                    CreatedBy = blog.CreatedBy,
                                    Summary = blog.Summary,
                                    ImageURL = blog.ImageUrl ?? "",
                                    Id = blog.Id,
                                    CreatedByName = blog.CreatedByUser.Email
                                })
                                .ToListAsync();
            return blogs;
        }
    }
}
