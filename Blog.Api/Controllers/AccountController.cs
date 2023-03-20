using Entities.DTO;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Utils.AuthUtils;

namespace Blog.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<ApplicationRole> _roleManager;
        private readonly TokenServices _tokenServices;

        public AccountController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, RoleManager<ApplicationRole> roleManager, TokenServices tokenServices)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            _tokenServices = tokenServices;
        }

        [HttpGet("hello")]
        [Authorize]
        public async Task<ActionResult<string>> SayHello()
        {
            return "Hello";
        }
        [HttpPost("login")]
        public async Task<ActionResult<LoginResponseDto>>Login(LoginRequestDto loginData)
        {
            if(!ModelState.IsValid) return BadRequest(loginData);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == loginData.EmailId);
            if (user == null) return BadRequest("Invalid credintials!");

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginData.Password, false);

            if (result.Succeeded) return new LoginResponseDto 
            { EmailId = user.Email,Token = _tokenServices.CreateToken(user), Id = user.Id
            };

            return BadRequest("Invalid credintials!");
        }
        //TODO: Implement Register
        [HttpPost("register")]
        public async Task<ActionResult<LoginResponseDto>> Register(LoginRequestDto registerData)
        {
            if (!ModelState.IsValid) return BadRequest(registerData);

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Email == registerData.EmailId);
            if (user != null) return BadRequest("User Already Exists!");

            var isRoleExist = await _roleManager.RoleExistsAsync("User");
            if (!isRoleExist)
            {
                await _roleManager.CreateAsync(new ApplicationRole { Name = "User" });
                await _roleManager.CreateAsync(new ApplicationRole { Name = "Admin" });
            }

            var appUser = new ApplicationUser
            {
                Email = registerData.EmailId,
                UserName = registerData.EmailId
            };

            var userRegister = await _userManager.CreateAsync(appUser, registerData.Password);

            if (userRegister.Succeeded) return new LoginResponseDto { EmailId = appUser.Email };

            return BadRequest("Invalid credintials!");
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<ActionResult<UserDto>> Profile()
        {
            var user = await _userManager.FindByNameAsync(User.Identity?.Name);
            
            if(user == null) return Unauthorized();

            return new UserDto
            {
                EmailId = user.Email,
                Id = user.Id
            };
        }

    }
}

