import { makeAutoObservable, runInAction } from "mobx";
import { catalogShop } from "../API/ShopServis";
import type { Category, Item } from "../interface/interface";
import type { IMenuItem } from "../interface/store";

class CatalogStore {
  categories: Category[] = [];
  dataCategoriesDropdown: IMenuItem[] = [];
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
      if (data) {
        const { categories } = data;

        this.categories = categories;
        this.dataCategoriesDropdown = categories.map((item) => {
          return {
            label: item.category,
            key: item.category,
          };
        });
      }
    } catch (err: any) {
      this.error = err.message || "Ошибка загрузки каталога";
    } finally {
      this.loading = false;
    }
  }
  
  setSelectedCategory(categoryName: string) {
    this.selectedCategory = categoryName;
  }
  
  get currentItems(): Item[] {
    if (!this.selectedCategory) return [];
    const category = this.categories.find(
      (c) => c.category === this.selectedCategory,
    );
    return category ? category.items : [];
  }
}

export const catalogStore = new CatalogStore();
