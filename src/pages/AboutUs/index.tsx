import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Select_Section from '../Home/section';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { handleGetAboutPage, handleRemoveAboutPageFeaturedMarketingCard, handleRemoveHomePageAsFeaturedMarketingCard, handleUpdateAboutPageAboutUs, handleUpdateAboutPageAsFeaturedMarketing, handleUpdateAboutPageBannerSection, handleUpdateAboutPageFeaturedMarketings } from '../../contextApi/api';
import { APISURL } from '../../contextApi/apiUrls';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

const Sections = ["Banner Section", "About Us", "As Featured Marketing", "Featured Marketing"];

const sectionMappings = {
  "Banner Section": [
    { type: "input", label: "Heading", placeholder: "Enter Heading", key: "heading" },
    { type: "input", label: "Heading 2", placeholder: "Enter Heading", key: "subheading" },
    { type: "input", label: "Description", placeholder: "Enter Description", key: "description" },
    { type: "input", label: "Description", placeholder: "Enter Description", key: "subdescription" },
  ],
  "About Us": [
    { type: "input", label: "Heading", placeholder: "Enter Heading", key: "heading" },
    { type: "input", label: "Card Title", placeholder: "Enter Title", key: "cardtitle" },
    { type: "input", label: "Card Description", placeholder: "Enter Description", key: "cardDescription" },
  ],
  "Featured Marketing": [],
};

const Hero = () => {

  const [fullAboutPageData,setFullAboutPageData] = useState({})


  const [showConfirmationModal,setShowConfirmationModal] = useState<boolean>(false)
  const [selectedId, setSelectedId] = useState<string | number | null>(null);


  const handleDeleteClick = (id: string | number) => {
    console.log(id,"ididid");
    setSelectedId(id);
    setShowConfirmationModal(true);
  };

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };


  const [selectedSection, setSelectedSection] = useState(Sections[0]); // Default to first section

  // Separate states for each section
  const [bannerSectionData, setBannerSectionData] = useState({});
  const [aboutUsData, setAboutUsData] = useState({});
  const [asfeaturedMarketingData, setAsfeaturedMarketingData] = useState({
    heading: "",
    description: "",
    cards: [{ title: '', description: '', buttonName: '', redirectUrl: '', image: null }]
  });

  const [featuredMarketingData, setFeaturedMarketingData] = useState({
    heading: "",
    cards: [
      {
        image: "",
        url: "",
        name: "",
        position: "",
        title: "",
        description: ""
      }
    ]
  });

  // Handle input change for dynamic fields in specific sections
  const handleInputChange = (section, key, value) => {
    switch (section) {
      case "Banner Section":
        setBannerSectionData((prevState) => ({
          ...prevState,
          [key]: value,
        }));
        break;
      case "About Us":
        setAboutUsData((prevState) => ({
          ...prevState,
          [key]: value,
        }));
        break;
      case "As Featured Marketing":
        setAsfeaturedMarketingData((prevState) => ({
          ...prevState,
          [key]: value,
        }));
        break;
      case "Featured Marketing":
        setFeaturedMarketingData((prevState) => ({
          ...prevState,
          [key]: value,
        }));
        break;
      default:
        break;
    }
  };

  const handleImageUpload = (section, key, file) => {
    const imageUrl = URL.createObjectURL(file);
    switch (section) {
      case "Banner Section":
        setBannerSectionData((prevState) => ({
          ...prevState,
          [key]: imageUrl,
        }));
        break;
      case "About Us":
        setAboutUsData((prevState) => ({
          ...prevState,
          [key]: imageUrl,
        }));
        break;
      case "As Featured Marketing":
        setAsfeaturedMarketingData((prevState) => ({
          ...prevState,
          cards: prevState.cards.map((card, index) =>
            index === key ? { ...card, image: file,url: imageUrl } : card
          ),
        }));
        break;
      case "Featured Marketing":
        setFeaturedMarketingData((prevState) => ({
          ...prevState,
          cards: prevState.cards.map((card, index) =>
            index === key ? { ...card, image: file,url: imageUrl } : card
          ),
        }));
        break;
      default:
        break;
    }
  };

  const handleAddCard = () => {
    if (selectedSection === "As Featured Marketing") {
      setAsfeaturedMarketingData((prevState) => ({
        ...prevState,
        cards: [...prevState.cards, { title: '', description: '', buttonName: '', redirectUrl: '', image: null }]
      }));
    } else if (selectedSection === "Featured Marketing") {
      setFeaturedMarketingData((prevState) => ({
        ...prevState,
        cards: [...prevState.cards, { image: '', url: '', name: '', position: '', title: '', description: '' }]
      }));
    }
  };

  const handleDeleteCard = (index,cardId) => {
    if (selectedSection === "As Featured Marketing") {
      const existCard = fullAboutPageData?.data?.asFeaturedMarketing?.AsFeaturedMarketingCards ? fullAboutPageData.data.asFeaturedMarketing.AsFeaturedMarketingCards.some((card) => card.id === cardId) : false;
      console.log("existCard",existCard);
      
      if(existCard){
          handleDeleteClick(cardId)
        return

      }
     
      const updatedCards = asfeaturedMarketingData.cards.filter((_, cardIndex) => cardIndex !== index);
      setAsfeaturedMarketingData((prevState) => ({
        ...prevState,
        cards: updatedCards,
      }));
    } else if (selectedSection === "Featured Marketing") {

      const existCard = fullAboutPageData?.data?.featuredMarketing?.homepagefeaturedProjectsCard ? fullAboutPageData.data.featuredMarketing.homepagefeaturedProjectsCard.some((card) => card.id === cardId) : false;
      console.log("existCard",existCard);
      
      if(existCard){
          handleDeleteClick(cardId)
        return

      }

      const updatedCards = featuredMarketingData.cards.filter((_, cardIndex) => cardIndex !== index);
      setFeaturedMarketingData((prevState) => ({
        ...prevState,
        cards: updatedCards,
      }));
    }
  };

  const handleCardInputChange = (section, index, field, value) => {
    if (section === "As Featured Marketing") {
      const updatedCards = [...asfeaturedMarketingData.cards];
      updatedCards[index][field] = value;
      setAsfeaturedMarketingData((prevState) => ({
        ...prevState,
        cards: updatedCards,
      }));
    } else if (section === "Featured Marketing") {
      const updatedCards = [...featuredMarketingData.cards];
      updatedCards[index][field] = value;
      setFeaturedMarketingData((prevState) => ({
        ...prevState,
        cards: updatedCards,
      }));
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const SendformData = new FormData()
    switch (selectedSection) {
      case "Banner Section":
        const data = {
          title:bannerSectionData.heading,
          title2:bannerSectionData.subheading,
          description:bannerSectionData.description,
          description2:bannerSectionData.subdescription
        }

        try {
          const res = await handleUpdateAboutPageBannerSection(data)
          console.log(res,"resresres");
          if(res?.data?.success){
            setBannerSectionData(res.data?.updatedBanners)
          }
          
          
        } catch (error) {
          
        }

        break;
      case "About Us":
        const data1 = {
          heading:aboutUsData?.heading,
          cardtitle:aboutUsData?.cardtitle,
          cardDescription:aboutUsData?.cardDescription
        }
        try {
          const res = await handleUpdateAboutPageAboutUs(data1)

          if(res?.data.success){
            setAboutUsData(res.data?.updatedSection)
          }
        } catch (error) {
          
        }  

        break;
      case "As Featured Marketing":
        SendformData.append("heading",asfeaturedMarketingData.heading)
        SendformData.append("description",asfeaturedMarketingData.description)

        asfeaturedMarketingData.cards.forEach((item,index)=>{
          if(item.id){
            SendformData.append(`AsFeaturedMarketingCards[${index}][id]`, item.id)
          }
          SendformData.append(`AsFeaturedMarketingCards[${index}][title]`, item.title)
          SendformData.append(`AsFeaturedMarketingCards[${index}][description]`, item.description)
          SendformData.append(`AsFeaturedMarketingCards[${index}][buttonPair][name]`, item.buttonName)
          SendformData.append(`AsFeaturedMarketingCards[${index}][buttonPair][link]`, item.redirectUrl)

          // SendformData.append(`AsFeaturedMarketingCards[${index}][buttonName]`, item.buttonName)
          // SendformData.append(`AsFeaturedMarketingCards[${index}][redirectUrl]`, item.redirectUrl)
          if(item.image){
            SendformData.append(`AboutPage_AsFeaturedMarketingCards_${index}`, item.image)
          }
        })
        try {
          const res = await handleUpdateAboutPageAsFeaturedMarketing(SendformData)
          if(res?.data.success){
            const {fullFeaturedMarketing} = res?.data
            const featuredData={
              heading:fullFeaturedMarketing?.heading,
              description:fullFeaturedMarketing?.description,
              cards:fullFeaturedMarketing?.AsFeaturedMarketingCards.map((item)=>{
                return{
                  id:item?.id,
                  title:item?.heading,
                  imageUrl:`${APISURL.BASE_URL}${item?.imageUrl}`,
                  description:item?.description,
                  buttonName:item?.buttonPair?.name,
                  redirectUrl:item?.buttonPair?.link
                }
              })
            } 

            setAsfeaturedMarketingData(featuredData)
          }
        } catch (error) {
          
        }

        break;
      case "Featured Marketing":
        SendformData.append('FeaturedMarketings[heading]', featuredMarketingData.heading);
        featuredMarketingData.cards.forEach((item,index)=>{
          if(item.id){
            SendformData.append(`FeaturedMarketings[featuredProjectsCard][${index}][id]`, item.id);
          }
          SendformData.append(`FeaturedMarketings[featuredProjectsCard][${index}][name]`, item.name);
          SendformData.append(`FeaturedMarketings[featuredProjectsCard][${index}][position]`, item.position);
          SendformData.append(`FeaturedMarketings[featuredProjectsCard][${index}][title]`, item.title);
          SendformData.append(`FeaturedMarketings[featuredProjectsCard][${index}][description]`, item.description);
          if(item.image){
            SendformData.append(`Homepage_featuredMarketing_ProjectsCard_${index}`, item.image);
          }
        })
              
        // Log the final data object
        console.log("Banner Section Data:", SendformData);
        try {
          const res = await handleUpdateAboutPageFeaturedMarketings(SendformData);
          console.log("resresres",res);
          if(res?.data?.status=="success"){
            const featuredData = {
              heading: res?.data?.fullFeaturedMarketing?.heading,
                cards: res?.data?.fullFeaturedMarketing?.homepagefeaturedProjectsCard
            }
            setFeaturedMarketingData(featuredData)
          }
          // debugger
        } catch (error) {
          
        }
        break;
      default:
        break;
    }
    fetchAboutPage()
    console.log('Banner Section Data:', bannerSectionData);
    console.log('About Us Data:', aboutUsData);
    console.log('As Featured Marketing Data:', asfeaturedMarketingData);
    console.log('Featured Marketing Data:', featuredMarketingData);

  };

  useEffect(()=>{
    fetchAboutPage()
  },[])


  const fetchAboutPage = async()=>{
    try {
      const aboutPage = await handleGetAboutPage()
      console.log(aboutPage,"aboutPage",aboutPage?.data?.banner);
      setFullAboutPageData(aboutPage)
      if(aboutPage?.data?.banner){
        const {banner} = aboutPage?.data
        const ReceiveData = {
          heading:banner?.heading,
          subheading:banner?.heading2,
          description:banner?.description,
          subdescription:banner?.description2,

        }
        setBannerSectionData(ReceiveData)
      }

      if(aboutPage?.data?.aboutus){
        const {aboutus} = aboutPage?.data
        setAboutUsData(aboutus)
      }
      if(aboutPage?.data?.asFeaturedMarketing){
        const {asFeaturedMarketing} = aboutPage?.data
        const featuredData={
          heading:asFeaturedMarketing?.heading,
          description:asFeaturedMarketing?.description,
          cards:asFeaturedMarketing?.AsFeaturedMarketingCards.map((item)=>{
            return{
              id:item?.id,
              title:item?.heading,
              imageUrl:`${APISURL.BASE_URL}${item?.imageUrl}`,
              description:item?.description,
              buttonName:item?.buttonPair?.name,
              redirectUrl:item?.buttonPair?.link
            }
          })
        } 

        console.log("featuredData",featuredData);
        setAsfeaturedMarketingData(featuredData)
        
        // setAboutUsData(aboutus)
      }
      
      if(aboutPage?.data?.featuredMarketing){
        const {featuredMarketing} = aboutPage?.data
        const data = {
          heading:featuredMarketing.heading,
          cards:featuredMarketing?.homepagefeaturedProjectsCard
        }
        setFeaturedMarketingData(data)  
      }

    
      
    } catch (error) {
      console.log(error,"fetchHomePage");
    }
}


const handleConfirmDelete=async(deleteItemId:number)=>{
  console.log("deleteItemId",deleteItemId);
  
  switch (selectedSection) {
   
  case "As Featured Marketing":
    const data4={
      asfeaturedMarketingCardId:deleteItemId
    }
    try {
      const res = await handleRemoveHomePageAsFeaturedMarketingCard(data4);
      console.log("resresres",res);
      if(res?.data.success){
        // setDeletedStatus(res?.data)
        setAsfeaturedMarketingData((prev)=>{
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
   
    case "Featured Marketing":
     const data5={
      featuredMarketingId:deleteItemId
     }
      try {
        const res = await handleRemoveAboutPageFeaturedMarketingCard(data5);
        console.log("resresres",res);
        if(res?.data.success){
          // setDeletedStatus(res?.data)
          setFeaturedMarketingData((prev)=>{
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



  return (
    <>
      {/* Select section */}
      <Breadcrumb pageName="About" />
      <Select_Section Sections={Sections} onSectionSelect={(section) => setSelectedSection(section)} />

      {/* Render the form only for the selected section */}
      <form className="bg-white p-6 rounded-lg shadow-lg mt-6" onSubmit={handleSubmit}>
        {selectedSection === "As Featured Marketing" ? (
          <>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Heading</label>
              <input
                type="text"
                value={asfeaturedMarketingData.heading}
                onChange={(e) => handleInputChange("As Featured Marketing", "heading", e.target.value)}
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter heading"
              /> 
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Description</label>
              <input
                type="text"
                value={asfeaturedMarketingData.description}
                onChange={(e) => handleInputChange("As Featured Marketing", "description", e.target.value)}
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Description"
              />
            </div>
            {asfeaturedMarketingData.cards.map((card, index) => (
              <div key={index} className="mb-6 p-4 border rounded-lg relative">
                {asfeaturedMarketingData.cards.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => handleDeleteCard(index,card?.id)}
                  >
                    <AiOutlineClose size={20} />
                  </button>
                )}

                <label className="block text-gray-700 font-medium mb-2 text-[14px]">Card Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload("As Featured Marketing", index, e.target.files[0])}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {(card.url || card?.imageUrl) && (
                  <img
                    src={card.url || card?.imageUrl}
                    alt={`Card Image ${index + 1}`}
                    className="mt-4 w-32 h-32 object-cover rounded-md"
                  />
                )}

                <label className="block text-gray-700 font-medium mb-2 mt-4 text-[14px]">Card Title</label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => handleCardInputChange("As Featured Marketing", index, 'title', e.target.value)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Title"
                />

                <label className="block text-gray-700 font-medium mb-2 mt-4 text-[14px]">Card Description</label>
                <input
                  type="text"
                  value={card.description}
                  onChange={(e) => handleCardInputChange("As Featured Marketing", index, 'description', e.target.value)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Description"
                />

                <label className="block text-gray-700 font-medium mb-2 mt-4 text-[14px]">Card Button</label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={card.buttonName}
                    onChange={(e) => handleCardInputChange("As Featured Marketing", index, 'buttonName', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Button Name"
                  />
                  <input
                    type="text"
                    value={card.redirectUrl}
                    onChange={(e) => handleCardInputChange("As Featured Marketing", index, 'redirectUrl', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Redirect URL"
                  />
                </div>
              </div>
            ))}

            <button
              type="button"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
              onClick={handleAddCard}
            >
              <AiOutlinePlus size={20} className="mr-2" />
              Add Card
            </button>
          </>
        ) : (
          sectionMappings[selectedSection].map((field, fieldIndex) => (
            <div key={fieldIndex} className="mb-6">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">{field.label}</label>

              {field.type === "input" && (
                <input
                  type="text"
                  value={selectedSection === "Banner Section" ? bannerSectionData?.[field.key] || '' : aboutUsData?.[field.key] || ''}
                  onChange={(e) => handleInputChange(selectedSection, field.key, e.target.value)}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={field.placeholder}
                />
              )}

              {field.type === "image-upload" && (
                <div className="flex flex-col space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(selectedSection, field.key, e.target.files[0])}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}
            </div>
          ))
        )}

        {selectedSection === "Featured Marketing" && (
          <>
            <div className="mb-5">
              <label className="block text-gray-700 font-medium mb-2 text-[14px]">Heading</label>
              <input
                type="text"
                value={featuredMarketingData.heading}
                onChange={(e) => handleInputChange("Featured Marketing", "heading", e.target.value)}
                className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Heading"
              />
            </div>
            {featuredMarketingData.cards.map((card, index) => (
              <div key={index} className="mb-6 p-4 border rounded-lg relative">
                {featuredMarketingData.cards.length > 1 && (
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-red-500"
                    onClick={() => handleDeleteCard(index,card?.id)}
                  >
                    <AiOutlineClose size={20} />
                  </button>
                )}

                <label className="block text-gray-700 font-medium mb-2">Card Image</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageUpload("Featured Marketing", index, e.target.files[0])}
                  className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {(card.url || card.imageUrl ) && (
                  <img
                    src={card.url || `${APISURL.BASE_URL}${card.imageUrl}`}
                    alt={`Card Image ${index + 1}`}
                    className="mt-4 w-32 h-32 object-cover rounded-md"
                  />
                )}

                <div className="mt-4">
                  <label className="block text-gray-700 font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={card.name}
                    onChange={(e) => handleCardInputChange("Featured Marketing", index, 'name', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Name"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 font-medium mb-2">Position</label>
                  <input
                    type="text"
                    value={card.position}
                    onChange={(e) => handleCardInputChange("Featured Marketing", index, 'position', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Position"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 font-medium mb-2">Card Title</label>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => handleCardInputChange("Featured Marketing", index, 'title', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Title"
                  />
                </div>
                <div className="mt-4">
                  <label className="block text-gray-700 font-medium mb-2">Card Description</label>
                  <input
                    type="text"
                    value={card.description}
                    onChange={(e) => handleCardInputChange("Featured Marketing", index, 'description', e.target.value)}
                    className="w-1/4 px-4 py-2 border rounded-md text-black text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter Description"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4"
              onClick={handleAddCard}
            >
              <AiOutlinePlus size={20} className="mr-2" />
              Add Card
            </button>
          </>
        )}

        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-md mt-4 hover:bg-blue-600">
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
