module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        import: ['./src/theme']
      }
    }
  },
  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  configureWebpack: {
    devServer: {
      before(app) {
        app.get('/api/goods', function(req, res) {
          res.json({
            code: 0,
            slider: [
              {
                id: 21,
                img: '/img/01.jpg'
              },
              {
                id: 22,
                img: '/img/02.jpg'
              },
              {
                id: 23,
                img: '/img/03.jpg'
              },
              {
                id: 24,
                img: '/img/04.jpg'
              }
            ],
            data: {
              phone: [
                {
                  id: 1,
                  title: '小米手机',
                  price: '100',
                  img: '/img/01.jpg',
                  count: 100
                },
                {
                  id: 2,
                  title: 'iphone',
                  price: '120',
                  img: '/img/03.jpg',
                  count: 100
                },
                {
                  id: 3,
                  title: '华为',
                  price: '80',
                  img: '/img/02.jpg',
                  count: 100
                },
                {
                  id: 4,
                  title: 'vivo',
                  price: '110',
                  img: '/img/04.jpg',
                  count: 100
                },
                {
                  id: 5,
                  title: 'oppo',
                  price: '200',
                  img: '/img/02.jpg',
                  count: 100
                },
                {
                  id: 6,
                  title: '360手机',
                  price: '30',
                  img: '/img/05.jpg',
                  count: 100
                }
              ],
              equipment: [
                {
                  id: 7,
                  title: '电饭煲',
                  price: '120',
                  img: '/img/03.jpg',
                  count: 101
                },
                {
                  id: 8,
                  title: '电冰箱',
                  price: '80',
                  img: '/img/02.jpg',
                  count: 100
                },
                {
                  id: 9,
                  title: '电热水器',
                  price: '110',
                  img: '/img/01.jpg',
                  count: 100
                },
                {
                  id: 10,
                  title: '电磁炉',
                  price: '200',
                  img: '/img/04.jpg',
                  count: 100
                }
              ],
              market: [
                {
                  id: 11,
                  title: '零食',
                  price: '80',
                  img: '/img/02.jpg',
                  count: 100
                },
                {
                  id: 12,
                  title: '水果',
                  price: '110',
                  img: '/img/01.jpg',
                  count: 100
                },
                {
                  id: 13,
                  title: '蔬菜',
                  price: '30',
                  img: '/img/04.jpg',
                  count: 100
                }
              ],
              book: [
                {
                  id: 14,
                  title: '文学',
                  price: '200',
                  img: '/img/01.jpg',
                  count: 100
                },
                {
                  id: 15,
                  title: '历史',
                  price: '120',
                  img: '/img/03.jpg',
                  count: 100
                },
                {
                  id: 16,
                  title: 'IT科技',
                  price: '80',
                  img: '/img/02.jpg',
                  count: 100
                }
              ],
              sport: [
                {
                  id: 17,
                  title: '跑步鞋',
                  price: '100',
                  img: '/img/01.jpg',
                  count: 100
                },
                {
                  id: 18,
                  title: '山地车',
                  price: '120',
                  img: '/img/03.jpg',
                  count: 100
                },
                {
                  id: 19,
                  title: '篮球',
                  price: '80',
                  img: '/img/02.jpg',
                  count: 100
                },
                {
                  id: 20,
                  title: '瑜伽垫',
                  price: '110',
                  img: '/img/05.jpg',
                  count: 100
                }
              ]
            },
            keys: ['phone', 'equipment', 'market', 'book', 'sport']
          })
        })

        app.get('/api/login', function(req, res) {
          const { username, password } = req.query
          if (username === 'dora' && password === '123') {
            res.json({
              code: 0,
              token: 'xxx'
            })
          } else {
            res.json({
              code: 1,
              message: '用户名或密码错误'
            })
          }
        })

        app.get('/api/logout', function(req, res) {
          res.json({ code: -1 })
        })
      }
    }
  }
}
