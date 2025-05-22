Page({
  data: {
    searchQuery: '', // 搜索输入的内容
    sortOption: '',  // 当前选择的排序选项 ('price' 或 'sales')
    selectedCategories: [], // 选中的多选框类别
    products: [
      {
        id: 1,
        name: '民宿1',
        price: 425,
        image: '/image/3.jpg',
        category: ['drink', 'food']  // 假设这个商品属低价和便利
      },
      {
        id: 2,
        name: '民宿2',
        price: 777,
        image: '/image/4.jpg',
        category: ['food']  // 假设这个商品只属于风景
      },
      {
        id: 3,
        name: '民宿3',
        price: 2300,
        image: '/image/5.jpg',
        category: ['condiment']  // 假设这个商品属于高档
      }
    ]
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
    // 这里可以触发请求后台接口获取搜索结果
    this.filterProducts();  // 根据搜索词和类别进行过滤
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
    this.sortProducts();  // 根据价格排序
  },

  // 销量排序
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
      // 按销量升序排序（假设销量是一个字段，当前示例中没有销量字段）
      sortedProducts.sort((a, b) => a.sales - b.sales || 0);  // 使用 0 作为默认销量值
    }

    this.setData({
      sortedProducts: sortedProducts
    });
  },

  // 返回首页函数
  goBackHome: function () {
    wx.navigateTo({
      url: '/pages/home/home'  
    });
  }
});
