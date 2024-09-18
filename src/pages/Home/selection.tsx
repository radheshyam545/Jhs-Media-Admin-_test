import Select_Section from "./section";
import { useEffect, useState } from 'react';
import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import InputPairComponent from "./InputPairComponent";
import { handleGetHomePage, handleRemoveHomePageBannerButtonPair, handleRemoveHomePageBrand, handleRemoveHomePageFeaturedMarketingCard, handleRemoveHomePageFeaturedProjectsCard, handleRemoveHomePageInfluencerServicesmManagementCard, handleRemoveHomePageOurMilestonesCard, handleUpdateHomePageBannerSection, handleUpdateHomePageBrands, handleUpdateHomePageFeaturedMarketings, handleUpdateHomePageFeaturedProjects, handleUpdateHomePageInfluencerMarketing, handleUpdateHomePageInfluencerServices, handleUpdateHomePageOurMilestones } from "../../contextApi/api";
import { APISURL } from "../../contextApi/apiUrls";
import ConfirmationModal from "../../components/ConfirmationModal/ConfirmationModal";
const Sections = ["Banner Section", "Influencer Services", "Influencer Marketing", "Our Milestones", "Featured Projects", "Brands", "Featured Marketing"];

const Hero = () => {
  const [fullHomePageData,setFullHomePageData] = useState()

  const [showConfirmationModal,setShowConfirmationModal] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [deletedStatus,setDeletedStatus] = useState({success:false,message:""})  
  const [BannerSection, setBannerSection] = useState({
    heading: '',
    heading2:"",
    description: '',
    buttonPair: []
  })



console.log("deletedStatus",BannerSection);

  const handleDeleteClick = (id: string | number) => {
    console.log(id,"ididid");
    setSelectedId(id);
    setShowConfirmationModal(true);
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };



  console.log(BannerSection, "BannerSection");

  const handleBannerInputChange = (fieldName, value) => {
    setBannerSection((prevData) => ({ ...prevData, [fieldName]: value }))
  }


  const [InfluencerServices, setInfluencerServices] = useState({
    id:1,
    heading: '',
    ManagementCards: [{ id:1,title: '', description: '', image: '', Button: {id:1, name: '', link: '' } }]
  });



  console.log(InfluencerServices, "InfluencerServices");

  const handleInfluencerServicesInputChange = (fieldName, value) => {
    setInfluencerServices((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const handleInfluencerServicesCardInputChange = (index, fieldName, value) => {
    setInfluencerServices(prevData => ({
      ...prevData,
      ManagementCards: prevData.ManagementCards.map((card, idx) =>
        idx === index ? {
          ...card,
          // Update the button fields only if the fieldName is 'Name' or 'link'
          Button: fieldName === 'name' || fieldName === 'link' ? {
            ...card.Button,
            [fieldName]: value
          } : card.Button,
          // Otherwise, update the card fields directly
          ...((fieldName !== 'name' && fieldName !== 'link') && { [fieldName]: value })
        } : card
      )
    }));
  };

  const handleInfluencerServicesCardImageUpload = (index, file) => {
    // const reader = new FileReader();
    // reader.onload = (e) => {
      
    // };
    // reader.readAsDataURL(file);
    setInfluencerServices(prevData => ({
      ...prevData,
      ManagementCards: prevData.ManagementCards.map((card, idx) =>
        idx === index ? { ...card, image: file, showImage:URL.createObjectURL(file) } : card
      )
    }));
  };


  const handleInfluencerServicesAddCard = () => {
    setInfluencerServices(prevData => {
      const lastId = prevData.ManagementCards.length > 0 
        ? prevData.ManagementCards[prevData.ManagementCards.length - 1].id 
        : 0;
      return {
        ...prevData,
        ManagementCards: [
          ...prevData.ManagementCards, 
          { 
            id: lastId + 1, 
            title: '', 
            description: '', 
            image: '', 
            Button: { id: lastId + 1, Name: '', link: '' } 
          }
        ]
      };
    });
  };
  

  

  const handleInfluencerServicesDeleteCard = (index,cardId) => {
    const existCard = fullHomePageData?.data?.InfluencerServices && fullHomePageData?.data?.InfluencerServices?.ManagementCards.some((card) => card.id === cardId);
    console.log("existcard",existCard);
    
    if(existCard){
      handleDeleteClick(cardId)
      return 
    }
    setInfluencerServices(prevData => ({
      ...prevData,
      ManagementCards: prevData.ManagementCards.filter((_, idx) => idx !== index)
    }));
  };



  const [InfluencerMarketing, setInfluencerMarketing] = useState(
    {
      heading: '',
      description: '',
      image: "",
      showImage: "",
      button: {
        name: "",
        link: ""
      }
    }
  )


  console.log("InfluencerMarketing", InfluencerMarketing);


  const handleInfluencerMarketingInputChange = (fieldName, value) => {
    setInfluencerMarketing(prevData => ({
      ...prevData,
      ...(fieldName === "name" || fieldName === "link" ? {
        button: {
          ...prevData.button,
          [fieldName]: value
        }
      } : {
        [fieldName]: value
      })
    }));
  };



  const handleInfluencerMarketingImageUpload = (fieldName, file) => {
    const reader = new FileReader();

    // Set the onload event handler correctly
    reader.onload = (e) => {
      setInfluencerMarketing(prevData => ({
        ...prevData,
        [fieldName]: file,
        showImage: e.target.result
      }));
    };

    // Start reading the file as a data URL
    reader.readAsDataURL(file);
  };


  //
  const [OurMilestones, setOurMilestones] = useState({
    heading: "",
    subHeading: "",
    description: "",
    images: []  // Array to hold multiple images
  });
  console.log("OurMilestones", OurMilestones);


  const handleOurMilestonesInputChange = (e) => {
    const { name, value } = e.target;
    setOurMilestones(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOurMilestonesImageChange = (e) => {
    setOurMilestones(prev => {
      const newId = prev.images.length > 0 ? prev.images[prev.images.length - 1].id + 1 : 1;
  
      const files = Array.from(e.target.files).map((file, index) => ({
        id: newId + index,  // Assigning incremental ids
        url: URL.createObjectURL(file),
        file
      }));
  
      return {
        ...prev,
        images: [...prev.images, ...files]
      };
    });
  };

  const handleOurMilestonesremoveImage = (index,imageId) => {
    const existImage = fullHomePageData?.data?.OurMilestones?.cards ? fullHomePageData?.data?.OurMilestones?.cards.some((card) => card.id === imageId) : false;
    console.log(existImage,"existimage");
    if(existImage){
      handleDeleteClick(imageId)
      return
    }

    setOurMilestones(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };



  const [FeaturedProjects, setFeaturedProjects] = useState([
    {
      id: 1,
      image: "",
      showImage: "",
      title: "",
      description: ""
    }
  ])

  console.log("FeaturedProjects", FeaturedProjects);

  const handleFeaturedProjectsImageUpload = (index, file) => {
    setFeaturedProjects(prevData => prevData.map((item, idx) => {
      if (index == idx) {
        return {
          ...item,
          image: file,
          showImage: URL.createObjectURL(file)
        }
      }
      return item
    }))
  }



  const handleFeaturedProjectsInputChange = (index, e) => {
    const { name, value } = e.target;
    setFeaturedProjects(prev => prev.map((item, idx) =>
      idx === index ? { ...item, [name]: value } : item
    ));
  };

  const handleFeaturedProjectsAddCard = () => {
    setFeaturedProjects(prev => {
      const extId = prev.length > 0 ? prev[prev.length - 1].id + 1 : 1;
      return [
        ...prev,
        {
          id: extId,
          image: "",
          showImage: "",
          title: "",
          description: ""  // Fixed typo: descriptionL -> description
        }
      ];
    });
  };
  

  const handleFeaturedProjectsDeleteCard = (index,cardId) => {
    const existCard = fullHomePageData?.data?.FeaturedProjects?.length>0 ? fullHomePageData?.data?.FeaturedProjects?.some((card) => card.id === cardId) : false;
    console.log(existCard,"existcard");
   
    if(existCard){
        handleDeleteClick(cardId)
      return
    }
    setFeaturedProjects((prev) => prev.filter((item, idx) => idx !== index))
  }



  const [Brands, setBrands] = useState([])

  console.log("brands", Brands);

  const handleBrandMultipleImageUpload = (e) => {
    const images = Array.from(e.target.files).map((file,index) => ({
      // id: Brands.length>0 ? Brands[Brands.length-1].id + 1 : 1, // Auto-increment id based on current array length
      image: file,
      url: URL.createObjectURL(file)
    }));

    console.log("images images", images);

    setBrands((prevData) => {
      // Check if the initial state is still the placeholder object
      if ((prevData.length === 1 && prevData[0].image === "" && prevData[0].url === "")) {
        return images; // Replace the initial state with new images
      } else {
        return [...prevData, ...images]; // Otherwise, append new images
      }
    });
    // e.target.value = '';
  }


  const handleBrandsRemoveImage = (index,brandId) => {
    const existBrand = fullHomePageData?.data?.Brands ? fullHomePageData?.data?.Brands.some((brand) => brand.id === brandId) : false;
    console.log(existBrand,"existbrand",brandId);
    if(existBrand){
      return handleDeleteClick(brandId)
    }
    setBrands((prevData) => prevData.filter((_, idx) => idx !== index))
  }


  //

  const [FeaturedMarketing, setFeaturedMarketing] = useState({
    heading: "",
    cards: [
      {
        // id:1,
        image: "",
        url: "",
        name: "",
        position: "",
        title: "",
        description: ""
      }
    ]
  })

  console.log(FeaturedMarketing, "FeaturedMarketing");


  const handleFeaturedMarketingInputChange = (index, e) => {
    const { name, value } = e.target;
    setFeaturedMarketing((prev) => {
      if (name == "heading") {
        return {
          ...prev,
          [name]: value
        }
      }
      return {
        ...prev,
        cards: prev.cards.map((item, idx) => (
          idx == index ? { ...item, [name]: value } : item
        ))
      }
    }
    )
  }



  const handleFeaturedMarketingImageUpload = (index, file) => {

    setFeaturedMarketing((prevData) => ({
      ...prevData,
      cards: prevData.cards.map((item, idx) => (
        index == idx ? { ...item, image: file, url: URL.createObjectURL(file) } : item
      ))
    }))
  }


  const handleFeaturedMarketingAddCard = () => {
    setFeaturedMarketing((prev) => {
      // const prevId = prev.cards.length > 0 ? prev.cards[prev.cards.length - 1].id + 1 : 1;
  
      return {
        ...prev,
        cards: [
          ...prev.cards,
          {
            // id: prevId,  // Increment the ID for the new card
            image: "",
            url: "",
            name: "",
            position: "",
            title: "",
            description: ""
          }
        ]
      };
    });
  };
  


  const handleFeaturedMarketingRemoveCard = (index,cardId)=>{
    const existCard = fullHomePageData?.data?.featuredMarketing?.homepagefeaturedProjectsCard ? fullHomePageData?.data?.featuredMarketing?.homepagefeaturedProjectsCard.some((card) => card.id === cardId) : false;
    console.log(existCard,"existCard",cardId);
    
    if(existCard){
      handleDeleteClick(cardId)
      return
    }
    setFeaturedMarketing((prev)=>({...prev,cards:prev.cards.filter((_,idx)=>index!==idx)}))
  }



  const [selectedSection, setSelectedSection] = useState("Banner Section");


  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  useEffect(()=>{
    fetchHomePage()
  },[])

  const fetchHomePage = async()=>{
      try {
        const homgePage = await handleGetHomePage()
        console.log(homgePage,"homgePage",homgePage?.data?.homePageBanners);
        setFullHomePageData(homgePage)
        if(homgePage?.data?.homePageBanners){
          const {homePageBanners} = homgePage?.data
          const ReceiveData = {
            heading:homePageBanners[0]?.title,
            heading2:homePageBanners[0]?.title2,
            description:homePageBanners[0]?.description,
            buttonPair:homePageBanners[0]?.buttonPair
          }
          console.log("ReceiveData",ReceiveData);
          setBannerSection(ReceiveData)
        }
        if (homgePage?.data?.InfluencerServices) {
          const { InfluencerServices } = homgePage?.data;
        
          console.log("InfluencerServices2222", InfluencerServices);
        
          // Check if ManagementCards exists and has items
          if (!InfluencerServices.ManagementCards || InfluencerServices.ManagementCards.length === 0) {
            // Set the default ManagementCards but keep the rest of the InfluencerServices object
            setInfluencerServices({
              ...InfluencerServices,  // Keep the existing heading, id, etc.
              ManagementCards: [
                { id: 1, title: '', description: '', image: '', Button: { id: 1, name: '', link: '' } }
              ]
            });
          } else {
            // Set InfluencerServices normally with ManagementCards
            setInfluencerServices(InfluencerServices);
          }
        }
        

        if(homgePage?.data?.InfluencerMarketing){
          const {InfluencerMarketing} = homgePage?.data
          setInfluencerMarketing(InfluencerMarketing)
        
        }
        if(homgePage?.data?.OurMilestones){
          const {OurMilestones} = homgePage?.data
          const data = {
            heading:OurMilestones?.heading,
            subHeading:OurMilestones?.subHeading,
            description:OurMilestones?.description,
            images:OurMilestones?.cards
          }
          setOurMilestones(data)
        
        }

        if(homgePage?.data?.FeaturedProjects?.length>0){
          const {FeaturedProjects} = homgePage?.data
          
          setFeaturedProjects(FeaturedProjects)
        
        }
        if(homgePage?.data?.Brands){
          const {Brands} = homgePage?.data
          
          setBrands(Brands)
        
        }
        if(homgePage?.data?.featuredMarketing){
          const {featuredMarketing} = homgePage?.data
          const data = {
            heading:featuredMarketing.heading,
            cards:featuredMarketing?.homepagefeaturedProjectsCard
          }
          setFeaturedMarketing(data)  
        }
      
        
      } catch (error) {
        console.log(error,"fetchHomePage");
      }
  }



  const handleSubmit = async(e) => {
    e.preventDefault();
    const formData = new FormData()
  
    // Log form data for debugging
    console.log("Form Data to send:", formData);
  
    // Check the selected section, assuming it's stored in a variable called `selectedSection`
    switch (selectedSection) {
      case "Banner Section":
        // Create the data structure for the banner section
        const data = {
          banners: [
            {
              id:1,
              title: BannerSection.heading || "Default Title", // You can replace these with form inputs
              title2: BannerSection.heading2 || "Default Title", // You can replace these with form inputs
              description: BannerSection.description || "Default Description",
              button: BannerSection.buttonPair
            }
          ]
        };
  
        // Log the final data object
        console.log("Banner Section Data:", data);
        try {
          const res = await handleUpdateHomePageBannerSection(data);
          console.log("resresres",res);
          // debugger
        } catch (error) {
         
        }
        break;
      case "Influencer Services":
        // Create the data structure for the banner section
        formData.append('heading', InfluencerServices.heading);
        formData.append('id', InfluencerServices.id);
    
        // Loop through ManagementCards to append each one dynamically
        InfluencerServices.ManagementCards.forEach((card, index) => {
          formData.append(`ManagementCards[${index}][id]`, card.id);
          formData.append(`ManagementCards[${index}][title]`, card.title);
          formData.append(`ManagementCards[${index}][description]`, card.description);
          formData.append(`ManagementCards[${index}][button][id]`, card.Button.id);
          formData.append(`ManagementCards[${index}][button][name]`, card.Button.name);
          formData.append(`ManagementCards[${index}][button][link]`, card.Button.link);
          
          // Append the image file if it exists
          if (card.image) {
            formData.append(`InfluencerServices_images_${index}`, card.image);
          }
        });
  
        // Log the final data object
        console.log("Banner Section Data:", formData);
        try {
          const res = await handleUpdateHomePageInfluencerServices(formData);
          console.log("resresres",res);
          // debugger
        } catch (error) {
          
        }
        break;
      case "Influencer Marketing":
        // Create the data structure for the banner section
        formData.append('heading', InfluencerMarketing.heading);
        formData.append('description', InfluencerMarketing.description);
        formData.append('button', JSON.stringify(InfluencerMarketing.button));
        if(InfluencerMarketing.image){
          formData.append('homepage_influencermarketing_image', InfluencerMarketing.image);
        }
    
        
  
        // Log the final data object
        console.log("Banner Section Data:", formData);
        try {
          const res = await handleUpdateHomePageInfluencerMarketing(formData);
          console.log("resresres",res);
          // debugger
        } catch (error) {
          
        }
        break;
      case "Our Milestones":
        // Create the data structure for the banner section
        formData.append('heading', OurMilestones.heading);
        formData.append('subHeading', OurMilestones.subHeading);
        formData.append('description', OurMilestones.description);
              
        OurMilestones.images.forEach((card, index) => {
          formData.append(`cards[${index}][id]`, card.id);
          // Append the image file if it exists
          if (card.file) {
            formData.append(`homepage_ourmilestonescards_${index}`, card.file);
          }
        });
        // Log the final data object
        console.log("Banner Section Data:", formData);
        try {
          const res = await handleUpdateHomePageOurMilestones(formData);
          console.log("resresresresresres",res);
          // debugger
        } catch (error) {
          
        }
        break;
      case "Featured Projects":
        // Create the data structure for the banner section
        FeaturedProjects.forEach((item,index)=>{
          formData.append(`FeaturedProjects[${index}][id]`, item.id);
          formData.append(`FeaturedProjects[${index}][title]`, item.title);
          formData.append(`FeaturedProjects[${index}][description]`, item.description);
          if(item.image){
            formData.append(`Homepage_FeaturedProjects_${index}`, item.image);
          }
        })
              
        // Log the final data object
        console.log("Banner Section Data:", formData);
        try {
          const res = await handleUpdateHomePageFeaturedProjects(formData);
          console.log("resresres",res);
          // debugger
        } catch (error) {
          
        }
        break;
      case "Brands":
        // Create the data structure for the banner section
      
        Brands.forEach((item,index)=>{
          if(item.id){
            formData.append(`Brands[${index}][id]`, item.id)
          }
          if(item.image){
            formData.append(`Homepage_Brands_${index}`, item.image);
          }
        })
              
        // Log the final data object
        console.log("Banner Section Data:", formData);
        try {
          const res = await handleUpdateHomePageBrands(formData);
          if(res?.data.success){
            setBrands(res?.data?.fullHomepageBrands?.Brands)
          }
          console.log("handleUpdateHomePageBrands",res);
          // debugger
        } catch (error) {
          
        }
        break;
      case "Featured Marketing":
        // Create the data structure for the banner section
        formData.append('FeaturedMarketings[heading]', FeaturedMarketing.heading);
        FeaturedMarketing.cards.forEach((item,index)=>{
          if(item.id){
            formData.append(`FeaturedMarketings[featuredProjectsCard][${index}][id]`, item.id);
          }
          formData.append(`FeaturedMarketings[featuredProjectsCard][${index}][name]`, item.name);
          formData.append(`FeaturedMarketings[featuredProjectsCard][${index}][position]`, item.position);
          formData.append(`FeaturedMarketings[featuredProjectsCard][${index}][title]`, item.title);
          formData.append(`FeaturedMarketings[featuredProjectsCard][${index}][description]`, item.description);
          if(item.image){
            formData.append(`Homepage_featuredMarketing_ProjectsCard_${index}`, item.image);
          }
        })
              
        // Log the final data object
        console.log("Banner Section Data:", formData);
        try {
          const res = await handleUpdateHomePageFeaturedMarketings(formData);
          console.log("resresres",res);
          if(res?.data?.status=="success"){
            const featuredData = {
              heading: res?.data?.fullFeaturedMarketing?.heading,
                cards: res?.data?.fullFeaturedMarketing?.homepagefeaturedProjectsCard
            }
            setFeaturedMarketing(featuredData)
          }
          // debugger
        } catch (error) {
          
        }
        break;
      default:
        // Handle other sections or cases
        break;
    }
    fetchHomePage()
  };
  



  const handleConfirmDelete=async(deleteItemId:number)=>{
    console.log("deleteItemId",deleteItemId);
    
    switch (selectedSection) {
      case "Banner Section":
        // Create the data structure for the banner section
        const data = {
          buttonId:deleteItemId
        };
  
        // Log the final data object
        console.log("Banner Section Data:", data);
        try {
          const res = await handleRemoveHomePageBannerButtonPair(data);
          console.log("resresres",res);
          if(res?.data.success){
            // setDeletedStatus(res?.data)
            setBannerSection((prev)=>{
              return {...prev,buttonPair:prev.buttonPair.filter((item)=>item.id!==deleteItemId)}
            })
            setShowConfirmationModal(false)
          }else{
            setShowConfirmationModal(false)
          }
          // debugger
        } catch (error) {
         
        }
        break;
        case "Influencer Services":
          const data1 = {
            managementCardId: deleteItemId
          };
        
          try {
            const res = await handleRemoveHomePageInfluencerServicesmManagementCard(data1);
            console.log("resresres", res);
        
            if (res?.data.success) {
              setInfluencerServices((prev) => {
                // Filter out the deleted item from ManagementCards
                const updatedManagementCards = prev.ManagementCards.filter((item) => item.id !== deleteItemId);
                
                // If the length becomes 0, set the default object
                if (updatedManagementCards.length === 0) {
                  return {
                    ...prev,
                    ManagementCards: [
                      { id: 1, title: '', description: '', image: '', Button: { id: 1, name: '', link: '' } }
                    ]
                  };
                }
        
                // Otherwise, return the updated ManagementCards
                return {
                  ...prev,
                  ManagementCards: updatedManagementCards
                };
              });
        
              setShowConfirmationModal(false);
            } else {
              setShowConfirmationModal(false);
            }
        
          } catch (error) {
            console.error(error);
          }        
        break;
      case "Influencer Marketing":
        // Create the data structure for the banner section
        formData.append('heading', InfluencerMarketing.heading);
        formData.append('description', InfluencerMarketing.description);
        formData.append('button', JSON.stringify(InfluencerMarketing.button));
        if(InfluencerMarketing.image){
          formData.append('homepage_influencermarketing_image', InfluencerMarketing.image);
        }
    
        
  
        // Log the final data object
        console.log("Banner Section Data:", formData);
        try {
          const res = await handleUpdateHomePageInfluencerMarketing(formData);
          console.log("resresres",res);
          // debugger
        } catch (error) {
          
        }
        break;
      case "Our Milestones":
        const data2={
          MilestonesCardId:deleteItemId
        }
        try {
          const res = await handleRemoveHomePageOurMilestonesCard(data2);
          console.log("resresres",res);
          if(res?.data.success){
            // setDeletedStatus(res?.data)
            setOurMilestones((prev)=>{
              return {...prev,images:prev.images.filter((item)=>item.id!==deleteItemId)}
            })
            setShowConfirmationModal(false)
          }else{
            setShowConfirmationModal(false)
          }
          // debugger
        } catch (error) {
          
        }
        break;
      case "Featured Projects":
       const data3={
        ProjectCardId:deleteItemId
       }
        try {
          const res = await handleRemoveHomePageFeaturedProjectsCard(data3);
          console.log("resresres",res);
          if(res?.data.success){
            // setDeletedStatus(res?.data)
            setFeaturedProjects((prev)=> prev.filter((item)=>item.id!==deleteItemId))
            
            setShowConfirmationModal(false)
          }else{
            setShowConfirmationModal(false)
          }
        
          // debugger
        } catch (error) {
          
        }
        break;
      case "Brands":
        const data4={
          BrandId:deleteItemId
        }
              
        
        try {
          const res = await handleRemoveHomePageBrand(data4);
          console.log("resresres",res);
          if(res?.data.success){
            // setDeletedStatus(res?.data)
            setBrands((prev)=> prev.filter((item)=>item.id!==deleteItemId))
            
            setShowConfirmationModal(false)
          }else{
            setShowConfirmationModal(false)
          }
          // debugger
        } catch (error) {
          
        }
        break;
      case "Featured Marketing":
       const data5={
        featuredMarketingId:deleteItemId
       }
        try {
          const res = await handleRemoveHomePageFeaturedMarketingCard(data5);
          console.log("resresres",res);
          if(res?.data.success){
            // setDeletedStatus(res?.data)
            setFeaturedMarketing((prev)=>{
              return {
                ...prev,cards:prev.cards.filter((item)=> item.id!==deleteItemId)
              }
            } )
          
            setShowConfirmationModal(false)
          }else{
            setShowConfirmationModal(false)
          }
          // debugger
        } catch (error) {
          
        }
        break;
      default:
        // Handle other sections or cases
        break;
    }
  }


  const renderSection = () => {
    switch (selectedSection) {
      case "Banner Section":
        return (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Heading</label>
              <input
                type="text"
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Heading"
                value={BannerSection.heading || ""}
                onChange={(e) => handleBannerInputChange("heading", e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Heading 2</label>
              <input
                type="text"
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Heading"
                value={BannerSection.heading2 || ""}
                onChange={(e) => handleBannerInputChange("heading2", e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Description</label>
              <input
                type="text"
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Description"
                value={BannerSection.description || ""}
                onChange={(e) => handleBannerInputChange("description", e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Button</label>
              <InputPairComponent
              ExistInputPairData = {fullHomePageData?.data?.homePageBanners[0].buttonPair}
               onInputPairChange={(pairs) => handleBannerInputChange("buttonPair", pairs)}  
              value={BannerSection.buttonPair}
              handleRemoveButtonPair={handleDeleteClick}
              deletedStatus={deletedStatus}
              />
            </div>
          </>
        );

      case "Influencer Services":
        return (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Heading</label>
              <input
                type="text"
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Heading"
                value={InfluencerServices.heading || ""}
                onChange={(e) => handleInfluencerServicesInputChange("heading", e.target.value)}
                required
              />
            </div>

            {InfluencerServices.ManagementCards.map((card, index) => (
              <>
                <div key={index} className="mb-6 p-4 border rounded-lg relative">
                  {InfluencerServices.ManagementCards.length > 1 && (
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-red-500"
                      onClick={() => handleInfluencerServicesDeleteCard(index,card.id)}
                    >
                      <AiOutlineClose size={20} />
                    </button>
                  )}

                  <label className="block text-gray-700 font-medium mb-2">Card Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => handleInfluencerServicesCardImageUpload(index, e.target.files[0])}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {(card.showImage || card?.imageUrl) && <img src={card.showImage || `${APISURL.BASE_URL}${card?.imageUrl}`} alt={`Card Image ${index + 1}`} className="w-32 h-32 object-cover rounded-md my-4" />}
                  {/* {card.showImage  && <img src={card.showImage } alt={`Card Image ${index + 1}`} className="w-32 h-32 object-cover rounded-md my-4" />} */}
                  <div className='mt-4'>
                    <label className="block text-gray-700 font-medium mb-2">Card Title</label>
                    <input
                      type="text"
                      value={card.title}
                      onChange={(e) => handleInfluencerServicesCardInputChange(index, 'title', e.target.value)}
                      className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Title"
                    />
                  </div>
                  <div className='mt-4'>
                    <label className="block text-gray-700 font-medium mb-2">Card Description</label>
                    <input
                      type="text"
                      value={card.description}
                      onChange={(e) => handleInfluencerServicesCardInputChange(index, 'description', e.target.value)}
                      className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter Description"
                    />
                  </div>

                  {/* <div className='mt-4'>
               <InputPairComponent />
               </div> */}
                  <div className="mt-4">
                    <label className="block text-gray-700 font-medium mb-2 text-[14px]">Button</label>
                    <div className="flex flex-col space-y-2">
                      <div className="flex space-x-2 items-center">
                        <input
                          type="text"
                          className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Button Name"
                          value={card?.Button?.name || ""}
                          onChange={(e) => handleInfluencerServicesCardInputChange(index, 'name', e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter Redirect URL"
                          onChange={(e) => handleInfluencerServicesCardInputChange(index, 'link', e.target.value)}
                          value={card?.Button?.link || ""}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
            <button
              type="button"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
              onClick={handleInfluencerServicesAddCard}
            >
              <AiOutlinePlus size={20} className="mr-2" />
              Add Card
            </button>
          </>
        );
      case "Influencer Marketing":
        return (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Heading</label>
              <input
                type="text"
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Heading"
                value={InfluencerMarketing.heading}
                onChange={(e) => { handleInfluencerMarketingInputChange("heading", e.target.value) }}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Description</label>
              <input
                type="text"
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Description"
                value={InfluencerMarketing.description}
                onChange={(e) => { handleInfluencerMarketingInputChange("description", e.target.value) }}
                required
              />
            </div>

            <div className="mb-6">
              <div className="flex flex-col space-y-2">
                <label className="block text-gray-700 font-medium mb-2 text-[14px]">Upload image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => { handleInfluencerMarketingImageUpload("image", e.target.files[0]) }}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required // Make input required

                />

                {(InfluencerMarketing?.showImage || InfluencerMarketing?.imageUrl) && <div className="relative w-32 h-32 object-cover rounded-md">
                  <img
                    src={InfluencerMarketing.showImage || `${APISURL.BASE_URL}${InfluencerMarketing.imageUrl}`}
                    alt={""}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Button</label>
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2 items-center">
                  <input
                    type="text"
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Button Name"
                    required
                    value={InfluencerMarketing?.button?.name}
                    onChange={(e) => { handleInfluencerMarketingInputChange("name", e.target.value) }}
                  />
                  <input
                    type="text"
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Redirect URL"
                    required
                    value={InfluencerMarketing?.button?.link}
                    onChange={(e) => { handleInfluencerMarketingInputChange("link", e.target.value) }}
                  />
                </div>
              </div>
            </div>
          </>
        );

      case "Our Milestones":
        return (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Heading</label>
              <input
                type="text"
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter heading"
                value={OurMilestones.heading}
                name="heading"
                onChange={handleOurMilestonesInputChange}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Sub Heading</label>
              <input
                type="text"
                name="subHeading"
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter sub heading"
                value={OurMilestones.subHeading}
                onChange={handleOurMilestonesInputChange}
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Description</label>
              <input
                type="text"
                name="description"
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Description"
                value={OurMilestones.description}
                onChange={handleOurMilestonesInputChange}

                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Upload Milestone Images </label>

              <div className="flex flex-col space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleOurMilestonesImageChange}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required // Make input required
                />

                <div className="flex flex-wrap gap-2 mt-2">
                  {OurMilestones.images.map((image, index) => (
                    <div key={index} className="relative w-32 h-32 object-cover rounded-md">
                      <img
                        src={image.url || `${APISURL.BASE_URL}${image?.imageUrl}`}
                        alt={`Milestone ${index + 1}`}
                        className="w-full h-full object-cover rounded-md"
                      />
                      <button
                        className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full focus:outline-none"
                        onClick={() => handleOurMilestonesremoveImage(index,image?.id)}
                      >
                        <AiOutlineClose size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
      case "Featured Projects":
        return (
          <>

            {FeaturedProjects.map((card, index) => (
              <div key={index} className="mb-6 p-4 border rounded-lg relative">
                {FeaturedProjects.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => handleFeaturedProjectsDeleteCard(index,card?.id)}
                  >
                    <AiOutlineClose size={20} />
                  </button>
                )}

                <label className="block text-gray-700 font-medium mb-2">Card Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFeaturedProjectsImageUpload(index, e.target.files[0])}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {(card.showImage || card?.imageUrl) && <div className="flex flex-wrap gap-4 mt-4">
                  <img key={index} src={card.showImage || `${APISURL.BASE_URL}${card?.imageUrl}`} alt={`Card Image ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
                </div>}


                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Card Title</label>
                  <input
                    type="text"
                    name="title"
                    value={card.title}
                    onChange={(e) => handleFeaturedProjectsInputChange(index, e)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Title"
                  />
                </div>
                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Card Description</label>
                  <input
                    type="text"
                    name="description"
                    value={card.description}
                    onChange={(e) => handleFeaturedProjectsInputChange(index, e)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Description"
                  />
                </div>

              </div>
            ))}
            <button
              type="button"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
              onClick={handleFeaturedProjectsAddCard}
            >
              <AiOutlinePlus size={20} className="mr-2" />
              Add Card
            </button>
          </>
        )
      case "Brands":
        return (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Upload Brands Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleBrandMultipleImageUpload}
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {Brands.map((item, idx) => (
                 ( item.url  || item?.imageUrl)&& <div key={idx} className="relative w-32 h-32 object-cover rounded-md">
                    <img
                      src={item.url || `${APISURL.BASE_URL}${item?.imageUrl}`}
                      alt={`Brand Image ${idx}`}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full focus:outline-none"
                      onClick={() => handleBrandsRemoveImage(idx,item?.id)}
                    >
                      <AiOutlineClose size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        );

      case "Featured Marketing":
        return (
          <>
            <div className='mb-5'>
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Heading</label>
              <input
                type="text"
                name="heading"
                value={FeaturedMarketing?.heading || ''}
                onChange={(e) => handleFeaturedMarketingInputChange(0, e)}
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={"enter heaingd"}
              />
            </div>
            {FeaturedMarketing?.cards?.map((card, index) => (
              <div key={index} className="mb-6 p-4 border rounded-lg relative">
                {FeaturedMarketing?.cards?.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => handleFeaturedMarketingRemoveCard(index,card?.id)}
                  >
                    <AiOutlineClose size={20} />
                  </button>
                )}

                <label className="block text-gray-700 font-medium mb-2">Card Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFeaturedMarketingImageUpload(index, e.target.files[0])}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {(card.url || card?.imageUrl) && <div className="flex flex-wrap gap-4 mt-4">
                  <img src={card.url || `${APISURL.BASE_URL}${card?.imageUrl}`} alt={`Card Image ${index + 1}`} className="w-32 h-32 object-cover rounded-md" />
                </div>}

                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={card.name}
                    name="name"
                    onChange={(e) => handleFeaturedMarketingInputChange(index, e)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                  />
                </div>
                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={card.position}
                    onChange={(e) => handleFeaturedMarketingInputChange(index, e)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter position"
                  />
                </div>
                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Card Title</label>
                  <input
                    type="text"
                    name="title"
                    value={card.title}
                    onChange={(e) => handleFeaturedMarketingInputChange(index, e)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Title"
                  />
                </div>
                <div className='mt-4'>
                  <label className="block text-gray-700 font-medium mb-2">Card Description</label>
                  <input
                    type="text"
                    name="description"
                    value={card.description}
                    onChange={(e) => handleFeaturedMarketingInputChange(index, e)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Description"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
              onClick={handleFeaturedMarketingAddCard}
            >
              <AiOutlinePlus size={20} className="mr-2" />
              Add Card
            </button>
          </>
        );

      default:
        return null;
    }
  };
  return (
    <>
      <Select_Section onSectionSelect={handleSectionChange} Sections={Sections} />
      {/* <img src="http://localhost:8000/uploads/file-1725872404135-738192718.jpg" alt="Uploaded Image" /> */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mt-6">
        {renderSection()}
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <ConfirmationModal
     isOpen={showConfirmationModal}
       title="Confirm Deletion"
        message="Are you sure you want to delete this item?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancel}
       id={selectedId} // Pass the selectedId to the modal
/>
    </>
  );
};
export default Hero;