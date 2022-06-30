const routes = [{
        path: '/',
        component: () =>
            import ('layouts/MainLayout.vue'),
        children: [{
                path: '/',
                component: () =>
                    import ('pages/Index.vue')
            },
            {
                path: '/about',
                component: () =>
                    import ('src/pages/About.vue')
            },
            {
                path: '/post',
                component: () =>
                    import ('src/pages/CreatePost.vue')
            },
            {
                path: '/search',
                component: () =>
                    import ('src/pages/Search.vue')
            },
            {
                path: '/reader/:id',
                component: () =>
                    import ('src/pages/Reader.vue')
            }
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: () =>
            import ('pages/Error404.vue')
    }
]

export default routes