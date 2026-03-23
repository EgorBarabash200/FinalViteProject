import { makeAutoObservable, runInAction } from 'mobx';
import { catalogShop } from '../API/ShopServis';
import type { Category, Item } from '../interface/interface';

class CatalogStore {
  categories: Category[] = [];
  dataCategoriesDropdown = [];
  loading = false;
  error: string | null = null;
  selectedCategory: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async loadCategories() {
    this.loading = true;
    this.error = null;
    try {
      const data = await catalogShop();
      runInAction(() => {
        this.categories = data.categories;
        this.dataCategoriesDropdown = data.categories.map((item: any) =>{
          return{
            label: item.category,
            key: item.category,
          }
        });
      });
    } catch (err: any) {
      runInAction(() => {
        this.error = err.message || 'Ошибка загрузки каталога';
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
  setSelectedCategory(categoryName: string) {
    this.selectedCategory = categoryName;
  }
  get currentItems(): Item[] {
    if (!this.selectedCategory) return [];
    const category = this.categories.find(c => c.category === this.selectedCategory);
    return category ? category.items : [];
  }
}

export const catalogStore = new CatalogStore(); 

