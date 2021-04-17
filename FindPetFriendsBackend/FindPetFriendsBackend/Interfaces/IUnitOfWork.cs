using System.Threading.Tasks;

namespace API.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IBreedsRepository BreedsRepository { get; }
        ICitiesRepository CitiesRepository { get; }

        Task<bool> Complete();
        bool HasChanges();
    }
}