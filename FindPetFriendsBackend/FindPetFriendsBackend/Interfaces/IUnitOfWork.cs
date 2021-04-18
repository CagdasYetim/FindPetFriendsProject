using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IBreedsRepository BreedsRepository { get; }
        ICitiesRepository CitiesRepository { get; }
        IEventRepository EventRepository { get; }

        Task<bool> Complete();
        bool HasChanges();
    }
}