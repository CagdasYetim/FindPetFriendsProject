using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class CitiesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        public CitiesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("all")]
        public async Task<ActionResult<ICollection<string>>> GetAllCities()
        {
            var cities = await _unitOfWork.CitiesRepository.GetAllCities();
            return Ok(cities);
        }

        [HttpGet("all/{code}")]
        public async Task<ActionResult<ICollection<string>>> GetAllCitiesWithCode(string code)
        {
            var cities = await _unitOfWork.CitiesRepository.GetAllCitiesWithCode(code);
            return Ok(cities);
        }
    }
}
