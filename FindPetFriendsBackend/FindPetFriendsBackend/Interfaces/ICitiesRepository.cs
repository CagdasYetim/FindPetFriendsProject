using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface ICitiesRepository
    {
        public Task<IEnumerable<string>> GetAllCities();
        public Task<IEnumerable<string>> GetAllCitiesWithCode(string Code);
    }
}
