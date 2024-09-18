import axios from "axios";
import {
    setToken,
    getToken
} from "./token";
import { APISURL } from "./apiUrls";

export const api = axios.create({
    baseURL: APISURL.BASE_URL,
});


const unauthError = () => {
    localStorage.clear();
    // window.location.href = '/auth/login'
}



// login
export const handleLogin = async (data) => {
    try {
        const res = await api.post(APISURL.ADMIN_LOGIN, data);
        
        if(res?.data?.api_token){
            setToken(res?.data?.api_token)
        }
        return res;
    } catch (error) {
       unauthError();  console.error(error);
    }
}


export const handleGetHomePage = async () => {
    try {
        const res = await api.get(APISURL.GET_HOMEPAGE);
        return res;
    } catch (error) {
        unauthError();  console.error(error);
    }
}

export const handleUpdateHomePageBannerSection = async (data) => {
    try {
        const res = await api.put(APISURL.UPDATE_HOMEPAGE_BANNER, data);
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}

export const handleRemoveHomePageBannerButtonPair = async (data) => {
    try {
        const res = await api.delete(APISURL.REMOVE_HOMEPAGE_BANNER_BUTTON_PAIR, {data});
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}





export const handleUpdateHomePageInfluencerServices = async (data) => {
    try {
        const res = await api.put(APISURL.UPDATE_HOMEPAGE_INFLUENCER_SERVICES,
        data,
        {
            headers:{
                "Content-Type":"multipart/form-data",
            
            }
        });
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}


export const handleRemoveHomePageInfluencerServicesmManagementCard = async (data) => {
    try {
        const res = await api.delete(APISURL.REMOVE_HOMEPAGE_INFLUENCER_SERVICES_MANAGEMENT_CARD, {data});
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}



export const handleUpdateHomePageInfluencerMarketing = async (data) => {
    try {
        const res = await api.put(APISURL.UPDATE_HOMEPAGE_INFLUENCER_MARKETING,
        data,
        {
            headers:{
                "Content-Type":"multipart/form-data",
            
            }
        });
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}


export const handleUpdateHomePageOurMilestones = async (data) => {
    try {
        const res = await api.put(APISURL.UPDATE_HOMEPAGE_OUR_MILESTONES,
        data,
        {
            headers:{
                "Content-Type":"multipart/form-data",
            
            }
        });
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}

export const handleRemoveHomePageOurMilestonesCard = async (data) => {
    try {
        const res = await api.delete(APISURL.REMOVE_HOMEPAGE_OUR_MILESTONES_CARD, {data});
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}



export const handleUpdateHomePageFeaturedProjects = async (data) => {
    try {
        const res = await api.put(APISURL.UPDATE_HOMEPAGE_FEATURED_PROJECTS,
        data,
        {
            headers:{
                "Content-Type":"multipart/form-data",
            
            }
        });
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}

export const handleRemoveHomePageFeaturedProjectsCard = async (data) => {
    try {
        const res = await api.delete(APISURL.REMOVE_HOMEPAGE_FEATURED_PROJECTS_CARD, {data});
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}




export const handleUpdateHomePageBrands = async (data) => {
    try {
        const res = await api.put(APISURL.UPDATE_HOMEPAGE_BRANDS,
        data,
        {
            headers:{
                "Content-Type":"multipart/form-data",
            
            }
        });
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}

export const handleRemoveHomePageBrand = async (data) => {
    try {
        const res = await api.delete(APISURL.REMOVE_HOMEPAGE_BRAND, {data});
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}



export const handleUpdateHomePageFeaturedMarketings = async (data) => {
    try {
        const res = await api.put(APISURL.UPDATE_FEATURED_MARKETINGS,
        data,
        {
            headers:{
                "Content-Type":"multipart/form-data",
            
            }
        });
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}

export const handleRemoveHomePageFeaturedMarketingCard = async (data) => {
    try {
        const res = await api.delete(APISURL.REMOVE_FEATURED_MARKETING_CARD, {data});
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}




//// about page

export const handleGetAboutPage = async () => {
    try {
        const res = await api.get(APISURL.GET_ABOUTPAGE);
        return res;
    } catch (error) {
        unauthError();  console.error(error);
    }
}


export const handleUpdateAboutPageBannerSection = async (data) => {
    try {
        const res = await api.put(APISURL.UPDATE_ABOUTPAGE_BANNER, data);
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}


export const handleUpdateAboutPageAboutUs = async(data)=>{
    try {
        const res = await api.put(APISURL.UPDATE_ABOUTPAGE_ABOUT_US, data);
        return res;
    } catch (error) {
        // unauthError(); 

        console.error(error);
        
    }
}

export const handleUpdateAboutPageAsFeaturedMarketing = async(data)=>{
    try {
        const res = await api.put(APISURL.UPDATE_ABOUTPAGE_AS_FEATURED_MARKETING,data, {
            
            headers:{
                 "Content-Type":"multipart/form-data",
            }
        });
        return res;
    } catch (error) {
        // unauthError(); 

        console.error(error);
        
    }
}


export const handleRemoveHomePageAsFeaturedMarketingCard = async (data) => {
    try {
        const res = await api.delete(APISURL.REMOVE_ABOUTPAGE_AS_FEATURED_MARKETING_CARD, {data});
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}


export const handleUpdateAboutPageFeaturedMarketings = async (data) => {
    try {
        const res = await api.put(APISURL.UPDATE_ABOUTPAGE_FEATURED_MARKETINGS,
        data,
        {
            headers:{
                "Content-Type":"multipart/form-data",
            
            }
        });
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}


export const handleRemoveAboutPageFeaturedMarketingCard = async (data) => {
    try {
        const res = await api.delete(APISURL.REMOVE_ABOUTPAGE_FEATURED_MARKETING_CARD, {data});
        return res;
    } catch (error) {
        // unauthError(); 
         console.error(error);
    }
}
export const handleUpdateWorkPageBennerSection= async (data) => {
        try {
            const res = await api.put(APISURL.UPDATE_WORKPAGE_BANNER, data);
            return res;
        } catch (error) {
            // unauthError(); 
             console.error(error);
        }
}

export const handleGetWorkPage = async () => {
        try {
            const res = await api.get(APISURL.GET_WORKPAGE);
            return res;
        } catch (error) {
            unauthError();  console.error(error);
        }
}
export const handleUpdateWorkPageBrands = async(data)=>{
    try {
        const res = await api.put(APISURL.UPDATE_WORKPAGE_BRAND,data, {
            
            headers:{
                 "Content-Type":"multipart/form-data",
            }
        });
        return res;
    } catch (error) {
        // unauthError(); 

        console.error(error);
        
    }
}