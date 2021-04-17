using API.Data;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repositories
{
    public class CitiesRepository : ICitiesRepository
    {
        private readonly DataContext _context;
        public CitiesRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<string>> GetAllCities()
        {
            return await _context.Cities.Select(c => c.Name).ToListAsync();
        }

        public async Task<IEnumerable<string>> GetAllCitiesWithCode(string Code)
        {
            return await _context.Cities
                                 .Where(all => all.Country.Equals(Code))
                                 .Select(c => c.Name)
                                 .ToListAsync();
        }
    }
}
