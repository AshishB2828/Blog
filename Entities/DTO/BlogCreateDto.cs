﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.DTO
{
    public class BlogCreateDto
    {

        public string? Title { get; set; }
        public string? Summary { get; set; }
        public string? Content { get; set; }
        public string? ImageURL { get; set; }
    }
}
