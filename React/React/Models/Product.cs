using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace React.Models
{
    public partial class Product
    {
        public Product()
        {
            ProductSold = new HashSet<Sales>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public float? Price { get; set; }

        public virtual ICollection<Sales> ProductSold { get; set; }
    }
}
