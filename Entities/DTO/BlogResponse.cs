using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class BlogResponse: BlogUpdateDto
    {
        public string CreatedAt { get; set; }
        public int CreatedBy { get; set; }
        public string CreatedByName { get; set; }
    }
}
