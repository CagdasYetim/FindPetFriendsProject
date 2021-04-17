using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class BreedsController : BaseApiController
    {

        private readonly IUnitOfWork _unitOfWork;
        public BreedsController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet("all")]
        public async Task<ActionResult<ICollection<string>>> GetAllBreeds()
        {
            var breeds = await _unitOfWork.BreedsRepository.GetAllBreeds();
            return Ok(breeds);
        }

    }
}
