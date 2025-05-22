Page({
  data: {
    searchQuery: '',  // 搜索输入的内容
    sortOption: '',   // 当前选择的排序选项 ('price' 或 'sales')
    selectedCategories: [],  // 选中的多选框类别
    products: [
      {
        id: 1,
        name: '毛豆腐',
        price: 15.8,
        sales: 200,  // 销量字段
        image: 'https://p6.itc.cn/q_70/images01/20211222/7acc1d0245294860a345242a803e3155.jpeg',
        category: ['food']  // 假设该商品属于食物
      },
      {
        id: 2,
        name: '豆宝摆件',
        price: 69.9,
        sales: 350,  // 销量字段
        image: '/image/6.png',
        category: ['diy']  
      },
      {
        id: 3,
        name: '豆宝捏捏系列盲盒',
        price: 25.0,
        sales: 120,  // 销量字段
        image: '/image/7.png',
        category: ['deco']  // 摆件
      },
    ],
    filteredProducts: []  // 用于存储过滤后的商品
  },
  goToGoods() {
    wx.switchTab({
      url: '/pages/goods/goods'
    });
  },
  goToCart() {
    wx.switchTab({
      url: '/pages/cart/cart'
    });
  },
  goToOrder() {
    wx.switchTab({
      url: '/pages/order/order'
    });
  },
  // 搜索输入处理
  onSearchInput: function (e) {
    this.setData({
      searchQuery: e.detail.value
    });
  },

  // 搜索按钮点击处理
  onSearch: function () {
    wx.showToast({
      title: `搜索: ${this.data.searchQuery}`,
      icon: 'none',
      duration: 2000
    });
    this.filterProducts();  // 根据搜索词进行过滤
  },

  // 价格排序按钮点击处理
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
