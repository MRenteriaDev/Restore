namespace API.RequestHelpers
{
    public class PaginationParams
    {
        public const int MaxPigeSize = 50;
        public int PageNumber { get; set; } = 1;
        public int _pageSize = 6;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = value > MaxPigeSize ? MaxPigeSize : value;
        }
    }
}