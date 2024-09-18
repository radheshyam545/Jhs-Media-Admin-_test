

export const APISURL = {


    BASE_URL: "http://localhost:8000",
    // BASE_URL: "http://192.168.0.14:8000",

    ADMIN_LOGIN: "/api/commons/adminLogin",

    // homepage 

    GET_HOMEPAGE: "/api/admin/homepage/1",

// UPDATE HOMEPAGE

    //banner section 

    UPDATE_HOMEPAGE_BANNER: "/api/admin/homepage/1/banners",
    REMOVE_HOMEPAGE_BANNER_BUTTON_PAIR:"/api/admin/homepage/1/banner/delete",
    // update influender services
    UPDATE_HOMEPAGE_INFLUENCER_SERVICES: "/api/admin/homepage/1/influencerservices",
    REMOVE_HOMEPAGE_INFLUENCER_SERVICES_MANAGEMENT_CARD:"/api/admin/homepage/1/influencer-service/delete",
    //
    UPDATE_HOMEPAGE_INFLUENCER_MARKETING: "/api/admin/homepage/1/influencermarketing",
    
    //
    UPDATE_HOMEPAGE_OUR_MILESTONES:"/api/admin/homepage/1/ourmilestones",
    REMOVE_HOMEPAGE_OUR_MILESTONES_CARD:"/api/admin/homepage/1/milestones/delete",
    //
    UPDATE_HOMEPAGE_FEATURED_PROJECTS:"/api/admin/homepage/1/featuredprojects",
    REMOVE_HOMEPAGE_FEATURED_PROJECTS_CARD:"/api/admin/homepage/1/featured-projects/delete",
    //
    UPDATE_HOMEPAGE_BRANDS:"/api/admin/homepage/1/brands",
    REMOVE_HOMEPAGE_BRAND:"/api/admin/homepage/1/brand/delete",
    //
    UPDATE_FEATURED_MARKETINGS:"/api/admin/homepage/1/featuredmarketings",
    REMOVE_FEATURED_MARKETING_CARD:"/api/admin/homepage/1/featured-marketing/delete",


/// update about page
// get about paage
GET_ABOUTPAGE:"/api/admin/aboutpage/1/getaboutpage",
///
UPDATE_ABOUTPAGE_BANNER: "/api/admin/aboutpage/1/banners",
/// aboutus
UPDATE_ABOUTPAGE_ABOUT_US: "/api/admin/aboutpage/1/aboutus",

// as featured marketing
UPDATE_ABOUTPAGE_AS_FEATURED_MARKETING: "/api/admin/aboutpage/1/asfeaturedmarketing",

REMOVE_ABOUTPAGE_AS_FEATURED_MARKETING_CARD: "/api/admin/aboutpage/1/as-featuredmarketing-card/delete",

/// fetured marketing 
UPDATE_ABOUTPAGE_FEATURED_MARKETINGS:"/api/admin/aboutpage/1/featuredmarketing",
REMOVE_ABOUTPAGE_FEATURED_MARKETING_CARD:"/api/admin/aboutpage/1/featured-marketing/delete",

///workpage
GET_WORKPAGE:"/api/admin/workpage/1",
UPDATE_WORKPAGE_BANNER: "/api/admin/workpage/1/banners",
UPDATE_WORKPAGE_BRAND: "/api/admin/workpage/1/brands",



};