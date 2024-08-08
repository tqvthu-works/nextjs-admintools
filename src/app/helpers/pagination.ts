import { IPagination } from "@/types/pagination";

export class PaginationHelper<T> {
  private total: number;
  private perPage: number;
  private static instance: PaginationHelper<T>;
  constructor(total: number, perPage: number) {
    this.total = total;
    this.perPage = perPage;
  }
  // Static method to get the singleton instance
  public static getInstance<T>(total: number, perPage: number): PaginationHelper<T> {
    if (!PaginationHelper.instance) {
      PaginationHelper.instance = new PaginationHelper<T>(total, perPage);
    }
    return PaginationHelper.instance as PaginationHelper<T>;
  }
  private getTo(page: number): number {
    if (page === 1) {
      return this.total < this.perPage ? this.total : this.perPage;
    }
    return (page - 1) * this.perPage + this.perPage;
  }

  private getLastPage(): number {
    if (this.total <= 1) {
      return 1;
    }
    return Math.ceil(this.total / this.perPage);
  }

  public getData(data: T[], page: number): IPagination<T> {
    return {
      data,
      meta: {
        current_page: page,
        last_page: this.getLastPage(),
        from: page === 1 ? 1 : (page - 1) * this.perPage + 1,
        to: this.getTo(page),
        per_page: this.perPage,
        total: this.total,
      },
    };
  }
}