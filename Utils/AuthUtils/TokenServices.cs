using Entities.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Utils.AuthUtils
{
    public class TokenServices
    {


        private readonly IConfiguration _configuration;

        public TokenServices(IConfiguration configuration)
        {
            _configuration = configuration;
        }


        public string CreateJwtToken(ApplicationUser user)
        {
            DateTime expiration = DateTime.Now.AddMinutes(1);
            //DateTime expiration = DateTime.UtcNow.AddMinutes(Convert.ToDouble(_configuration["Jwt:EXPIRATION_MINUTES"]));

            Claim[] claims = new Claim[] {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()), //Subject (user id)

                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), //JWT unique ID

                    new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()), //Issued at (date and time of token generation)

                    new Claim(ClaimTypes.NameIdentifier, user.Email), //Unique name identifier of the user (Email)

                    new Claim(ClaimTypes.Name, user.UserName) //Name of the user
                   };


            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(
             Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])
             );

            SigningCredentials signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            JwtSecurityToken tokenGenerator = new JwtSecurityToken(
             _configuration["Jwt:Issuer"],
             _configuration["Jwt:Audience"],
             claims,
             expires: expiration,
             signingCredentials: signingCredentials
             );

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            string token = tokenHandler.WriteToken(tokenGenerator);


            return token;

        }
    }
}
