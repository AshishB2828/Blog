using Entities.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.ServiceContracts
{
    public interface IBlogServices
    {

        Task<BlogResponse> CreateBlog(BlogCreateDto blogCreateDto, int currentUserId);

        Task<BlogResponse> UpdateBlog(BlogUpdateDto blogCreateDto, int currentUserId);

        Task<List<BlogResponse>> GetAllAvailableBlogs();
        Task<BlogResponse> GetPostById(int id);
        Task<bool> DeletePostById(int id, int userId);
        Task<List<BlogResponse>> GetPostByPersonId(int userId);
    }
}
