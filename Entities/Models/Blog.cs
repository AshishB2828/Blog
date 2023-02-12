using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Models
{
    public class Blog
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Summary { get; set; }
        public string? Content { get; set; }
        public DateTime CreatedAt { get; set; }

        [ForeignKey("CreatedByUser")]
        public int CreatedBy { get; set; }
        public ApplicationUser CreatedByUser { get; set; }
        public string ImageUrl { get; set; }

    }
}
