const AdminBro = require("admin-bro");
const AdminBroExpress = require("admin-bro-expressjs");
const AdminBroMongoose = require("admin-bro-mongoose");
const mongoose = require("mongoose");
const Product = require("../models/product");
const User = require("../models/user");
const Order = require("../models/order");
const Category = require("../models/category");
AdminBro.registerAdapter(AdminBroMongoose);

const express = require("express");
const {fa} = require("faker/lib/locales");
const app = express();

const adminBro = new AdminBro({
    databases: [mongoose],
    rootPath: "/admin",
    branding: {
        companyName: "Tehran Afzar",
        logo: "/logo.png",
        softwareBrothers: false
    },
    resources: [
        {
            resource: Product,
            options: {
                parent: {
                    name: "Admin Content",
                    icon: "InventoryManagement",
                },
                properties: {
                    description: {
                        // type: "richtext",
                        isVisible: {list: false, filter: true, show: true, edit: true},
                    },
                    _id: {
                        isVisible: {list: false, filter: true, show: true, edit: false},
                    },
                    view: {
                        isVisible: {list: false, filter: true, show: true, edit: false},
                    },
                    purchase: {
                        isVisible: {list: false, filter: true, show: true, edit: false},
                    },
                    createdAt: {
                        isVisible: {list: false, filter: true, show: true, edit: false},
                    },
                    title: {
                        isTitle: true,
                    },
                    price: {
                        type: "number",
                    },
                    imagePath: {
                        isVisible: {list: false, filter: false, show: true, edit: true},
                        components: {
                            show: AdminBro.bundle(
                                "../components/admin-imgPath-component.jsx"
                            ),
                        },
                    },
                },
            },
        },
        {
            resource: User,
            options: {
                parent: {
                    name: "User Content",
                    icon: "User",
                },
                properties: {
                    _id: {
                        isVisible: {list: false, filter: true, show: true, edit: false},
                    },
                    username: {
                        isTitle: true,
                    },
                },
            },
        },
        {
            resource: Order,
            options: {
                parent: {
                    name: "User Content",
                    icon: "User",
                },
                properties: {
                    userId: {
                        isVisible: {list: true, filter: true, show: true, edit: false},
                    },
                    _id: {
                        isVisible: {list: false, filter: true, show: true, edit: false},
                    },
                    amount: {
                        isVisible: {list: false, filter: true, show: true, edit: false},
                    },
                    address: {
                        isVisible: {list: false, filter: false, show: false, edit: false},
                    },
                    products: {
                        isVisible: {list: true, filter: true, show: true, edit: false},
                    },
                    createdAt: {
                        isVisible: {list: false, filter: true, show: true, edit: false},
                    }
                },
            },
        },
        {
            resource: Category,
            options: {
                parent: {
                    name: "Admin Content",
                    icon: "User",
                },
                properties: {
                    _id: {
                        isVisible: {list: false, filter: true, show: true, edit: false},
                    },
                    slug: {
                        isVisible: {list: true, filter: true, show: true, edit: false},
                    },
                    title: {
                        isTitle: true,
                    },
                },
            },
        },
    ],
    locale: {
        translations: {
            labels: {
                loginWelcome: "Admin Panel Login",
            },
            messages: {
                loginWelcome:
                    "Please enter your credentials to log in and manage your website contents",
            },
        },
    },
    dashboard: {
        component: AdminBro.bundle("../components/admin-dashboard-component.jsx"),
    },
});

const ADMIN = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
};

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
    authenticate: async (email, password) => {
        return ADMIN;

        if (ADMIN.password === password && ADMIN.email === email) {
            return ADMIN;
        }
        return null;
    },
    cookieName: process.env.ADMIN_COOKIE_NAME,
    cookiePassword: process.env.ADMIN_COOKIE_PASSWORD,
});

module.exports = router;
