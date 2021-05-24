using System.Threading.Tasks;
using API.Interfaces;
using API.Repositories;
using AutoMapper;
using Microsoft.Extensions.Configuration;

namespace API.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IConfiguration _configuration;

        public UnitOfWork(DataContext context, IMapper mapper, IConfiguration configuration)
        {
            _context = context;
            _mapper = mapper;
            _configuration = configuration;
        }

        public IUserRepository UserRepository => new UserRepository(_context, _mapper);
        public ICitiesRepository CitiesRepository => new CitiesRepository(_context);
        public IBreedsRepository BreedsRepository => new BreedsRepository(_context);
        public IEventRepository EventRepository => new EventRepository(_context, _mapper);
        public IUserNotificationRepository UserNotificationRepository => new UserNotificationRepository(_context,_configuration);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public bool HasChanges()
        {
            return _context.ChangeTracker.HasChanges();
        }
    }
}