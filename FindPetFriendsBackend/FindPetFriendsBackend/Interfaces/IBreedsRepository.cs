using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IBreedsRepository
    {
        public Task<IEnumerable<string>> GetAllBreeds();
    }
}
