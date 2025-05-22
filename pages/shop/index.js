Page({
  data: {
    searchQuery: '',  // 搜索输入的内容
    sortOption: '',   // 当前选择的排序选项 ('price' 或 'sales')
    selectedCategories: [],  // 选中的多选框类别
    products: [
      {
        id: 1,
        name: '老北京果脯',
        price: 15.8,
        sales: 200,  // 销量字段
        image: 'https://p4.itc.cn/q_70/images03/20230927/963402f86400465f991b2c9542f53750.jpeg',
        category: ['food']  // 食物
      },
      {
        id: 2,
        name: '祁门红茶',
        price: 39.9,
        sales: 350,  // 假设有销量字段
        image: 'https://example.com/img2.jpg',
        category: ['drink']  // 假设该商品属于饮品
      },
      {
        id: 3,
        name: '黄山烧饼',
        price: 9.9,
        sales: 120,  // 假设有销量字段
        image: 'https://example.com/img3.jpg',
        category: ['food']  // 假设该商品属于食物
      },
      {
        id: 4,
        name: '蜂蜜',
        price: 25.0,
        sales: 120,  // 销量字段
        image: '/image/7.png',
        category: ['deco']  // 摆件
      },
      {
        id: 5,
        name: '杏仁豆腐',
        price: 25.0,
        sales: 120,  // 销量字段
        image: 'https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/46EDBE2C-5A8C-4D34-B868-01B93BD47865/Derivates/EADE8175-722E-4E53-BA74-B05DF55A99E1.jpg',
        category: ['food']  
      },
      {
        id: 6,
        name: '豆乳咖啡',
        price: 25.9,
        sales: 120,  // 销量字段
        image: 'https://www.nespresso.com/ncp/res/uploads/recipes/nespresso-recipes-Hazelino-Muffin-%26-Coconut-Latte.jpg',
        category: ['food']  
      }
    ],
    filteredProducts: []  // 用于存储过滤后的商品
  },

  // 搜索输入处理
  onSearchInput: function (e) {
    this.setData({
      searchQuery: e.detail.value
    });
  },

  // 搜索按
  onSearch: function () {
    wx.showToast({
      title: `搜索: ${this.data.searchQuery}`,
      icon: 'none',
      duration: 2000
    });
    this.filterProducts();  // 搜索词过滤
  },

  // 价格排序
  onSortByPrice: function () {
    this.setData({
      sortOption: 'price'
    });
    wx.showToast({
      title: '已按价格排序',
      icon: 'none',
      duration: 2000
    });
    this.sortProducts();  // 根据价格排序商品
  },

  // 销量排序按钮点击处理
  onSortBySales: function () {
    this.setData({
      sortOption: 'sales'
    });
    wx.showToast({
      title: '已按销量排序',
      icon: 'none',
      duration: 2000
    });
    this.sortProducts();  // 根据销量排序商品
  },

  // 多选框变化处理
  onCategoryChange: function (e) {
    this.setData({
      selectedCategories: e.detail.value  // 更新选择的类别
    });
    wx.showToast({
      title: `已选择: ${e.detail.value.join(', ')}`,
      icon: 'none',
      duration: 2000
    });
    this.filterProducts();  // 根据选中的类别过滤商品
  },

  // 根据搜索关键词和类别过滤商品
  filterProducts: function () {
    const filteredProducts = this.data.products.filter(product => {
      // 搜索关键词匹配商品名
      const matchesSearch = product.name.toLowerCase().includes(this.data.searchQuery.toLowerCase());
      // 商品类别匹配选中的类别
      const matchesCategory = this.data.selectedCategories.length === 0 || 
        this.data.selectedCategories.some(category => product.category.includes(category));

      return matchesSearch && matchesCategory;
    });

    this.setData({
      filteredProducts: filteredProducts
    });
  },

  // 排序商品
  sortProducts: function () {
    let sortedProducts = [...this.data.filteredProducts || this.data.products];  // 使用过滤后的商品进行排序

    if (this.data.sortOption === 'price') {
      // 按价格升序排序
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (this.data.sortOption === 'sales') {
      // 按销量升序排序
      sortedProducts.sort((a, b) => a.sales - b.sales || 0);  // 使用 0 作为默认销量值
    }

    this.setData({
      filteredProducts: sortedProducts
    });
  },

  // 返回首页函数
  goBackHome: function () {
    wx.navigateTo({
      url: '/pages/home/home'  
    });
  }
});
