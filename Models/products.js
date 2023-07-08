const products = [
    {
        productName: 'jeans',
        iconurl : 0,
        description: "Strong, durable and BLUE!!!",
        price: 100,
        
        addOn : [
            {
                type: 'wash',
                price: 24,
                status: false
            },
            {
                type: 'bleach',
                price: 12,
                status: false
            },
            {
                type: 'iron',
                price: 20,
                status: false
            },
            {
                type: 'towel',
                price: 18,
                status: false
            }
        ]
    },
    {
        productName: 'shirt',
        iconurl : 1,
        description: "Formal, Simple and Clean",
        price: 50,
        
        addOn : [
            {
                type: 'wash',
                price: 24,
                status: false
            },
            {
                type: 'bleach',
                price: 22,
                status: false
            },
            {
                type: 'iron',
                price: 10,
                status: false
            },
            {
                type: 'towel',
                price: 11,
                status: false
            }
        ]
    },
    {
        productName: 'tshirt',
        iconurl : 2,
        description: "Simple, has your favorite motivational quote",
        price: 40,
        
        addOn : [
            {
                type: 'wash',
                price: 32,
                status: false
            },
            {
                type: 'bleach',
                price: 15,
                status: false
            },
            {
                type: 'iron',
                price: 18,
                status: false
            },
            {
                type: 'towel',
                price: 13,
                status: false
            }
        ]
    },
    {
        productName: 'trouser',
        iconurl : 3,
        description: "Formal and will help you in your interview",
        price: 100,
        
        addOn : [
            {
                type: 'wash',
                price: 42,
                status: false
            },
            {
                type: 'bleach',
                price: 15,
                status: false
            },
            {
                type: 'iron',
                price: 22,
                status: false
            },
            {
                type: 'towel',
                price: 16,
                status: false
            }
        ]
    },
    {
        productName: 'boxers',
        iconurl : 4,
        description: "When life is tough, they'll never leave you hanging",
        price: 10,
        
        addOn : [
            {
                type: 'wash',
                price: 16,
                status: false
            },
            {
                type: 'bleach',
                price: 8,
                status: false
            },
            {
                type: 'iron',
                price: 10,
                status: false
            },
            {
                type: 'towel',
                price: 9,
                status: false
            }
        ]
    },
    {
        productName: 'jogger',
        iconurl : 5,
        description: "Not only for jogging",
        price: 30,
        
        addOn : [
            {
                type: "wash",
                price: 24,
                status: false
            },
            {
                type: 'bleach',
                price: 11,
                status: false
            },
            {
                type: 'iron',
                price: 27,
                status: false
            },
            {
                type: 'towel',
                price: 13,
                status: false
            }
        ]
    }
]


exports.products = products;