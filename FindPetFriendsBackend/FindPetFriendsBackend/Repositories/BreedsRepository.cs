using API.Data;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories
{
    public class BreedsRepository : IBreedsRepository
    {
        private readonly DataContext _context;
        public BreedsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<string>> GetAllBreeds()
        {
            return await _context.AllBreeds.Select(b => b.Value).ToListAsync();
        }
    }
}
