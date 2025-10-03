import React from "react";
import "./Tags.css"; // 👈 Import CSS file
export const jobTags=[
    { value: 'FRUITS', label: 'FRUITS'}, { value: 'APPLES', label: 'APPLES'},{ value: 'Organic Apples', label: 'Organic Apples'},
    { value: 'Red Apples',label:'Red Apples'},{value:'Green Apples',label:'Green Apples'},{value:'Kashmiri Apples',label:'Kashmiri Apples'},
    { value: 'Imported Apples', label: 'Imported Apples' }, { value: 'Apple Basket', label: 'Apple Basket' },
    { value: 'Apple for Juice', label: 'Apple for Juice' },  { value: 'BANANAS', label: 'BANANAS' },{ value: 'Organic Bananas', label: 'Organic Bananas' },
    { value: 'Raw Bananas', label: 'Raw Bananas' },{ value: 'Ripe Bananas', label: 'Ripe Bananas' }, { value: 'Banana for Smoothie', label: 'Banana for Smoothie' },
    { value: 'Banana Combo Pack', label: 'Banana Combo Pack' }, { value: 'Banana Chips Raw Material', label: 'Banana Chips Raw Material' }, { value: 'MANGOES', label: 'MANGOES' },
    { value: 'Organic Mangoes', label: 'Organic Mangoes' }, { value: 'Alphonso Mango', label: 'Alphonso Mango' }, 
    { value: 'Dasheri Mango', label: 'Dasheri Mango' }, { value: 'Langra Mango', label: 'Langra Mango' },
    { value: 'Kesar Mango', label: 'Kesar Mango' }, { value: 'Mango Basket', label: 'Mango Basket' }, { value: 'Mango Pulp', label: 'Mango Pulp' },
    { value: 'ORANGES & CITRUS', label: 'ORANGES & CITRUS' }, { value: 'Fresh Oranges', label: 'Fresh Oranges' }, { value: 'Imported Oranges', label: 'Imported Oranges' },
    { value: 'Sweet Lime (Mosambi)', label: 'Sweet Lime (Mosambi)' }, { value: 'Mandarin Orange', label: 'Mandarin Orange' }, { value: 'Heroku', label: 'Heroku' },
    { value: 'Tangerine', label: 'Tangerine' }, { value: 'Citrus Fruits', label: 'Citrus Fruits' },
    { value: 'Vitamin C Fruits', label: 'Vitamin C Fruits' }, { value: 'GRAPES', label: 'GRAPES' }, { value: 'Green Grapes', label: 'Green Grapes' },
    { value: 'Black Grapes', label: 'Black Grapes' }, { value: 'Seedless Grapes', label: 'Seedless Grapes' },
    { value: 'Organic Grapes', label: 'Organic Grapes' }, { value: 'Grapes for Juice', label: 'Grapes for Juice' },
    { value: 'BERRIES', label: 'BERRIES' }, { value: 'Fresh Strawberries', label: 'Fresh Strawberries' },
    { value: 'Blueberries', label: 'Blueberries' }, { value: 'Raspberries', label: 'Raspberries' },
    { value: 'Blackberries', label: 'Blackberries' }, { value: 'Organic Berries', label: 'Organic Berries' },
    { value: 'Imported Berries', label: 'Imported Berries'}, { value:'MELONS', label: 'MELONS' },{ value: 'Watermelon', label: 'Watermelon' }, 
    { value: 'Musk Melon', label: 'Musk Melon' },
    { value: 'Rock Melon', label: 'Rock Melon'}, { value: 'Fresh Cut Melon', label: 'Fresh Cut Melon'},
    { value: 'Summer Melons', label: 'Summer Melons' }, { value: 'EXOTIC FRUITS', label: 'EXOTIC FRUITS' }, { value: 'Kiwi', label: 'Kiwi' },
    { value: 'Dragon Fruit', label: 'Dragon Fruit'}, { value:'Avocado', label: 'Avocado' },{ value: 'Passion Fruit', label: 'Passion Fruit' },
    { value: 'Rambutan', label: 'Rambutan'}, { value: 'Mangosteen', label: 'Mangosteen'},
    { value: 'Imported Exotic Fruits',label:'Imported Exotic Fruits'},{value:'SEASONAL FRUITS',label:'SEASONAL FRUITS'},{value:'EXOTIC FRUIT BASKET',label:'EXOTIC FRUIT BASKET'},
    { value: 'ORGANIC FRUIT BASKET', label: 'ORGANIC FRUIT BASKET' }, { value: 'CUT FRUITS', label: 'CUT FRUITS' },
    { value: 'DRIED FRUITS', label: 'DRIED FRUITS' },  { value: 'JUICE FRUITS', label: 'JUICE FRUITS' },{ value: 'VITAMIN RICH FRUITS', label: 'VITAMIN RICH FRUITS' },
   // { value: 'SECURITY & DEVSECOPS', label: 'SECURITY & DEVSECOPS'}, { value: 'PenetrationTesting', label: 'PenetrationTesting'},
   // { value: 'EthicalHacking',label:'EthicalHacking'},{value:'SIEM',label:'SIEM'},{value:'ZeroTrust',label:'ZeroTrust'},
   // { value: 'SSO', label: 'SSO' }, { value: 'IAM', label: 'IAM' },
   // { value: 'SOCAnalyst', label: 'SOCAnalyst' },  { value: 'SecurityCompliance', label: 'SecurityCompliance' }, 
   // { value: 'DATA & ANALYTICS', label: 'DATA & ANALYTICS'}, { value: 'PowerBI', label: 'PowerBI'},
   // { value: 'Tableau',label:'Tableau'},{value:'ETL',label:'ETL'},{value:'BigData',label:'BigData'},
   // { value: 'ApacheSpark', label: 'ApacheSpark' }, { value: 'Kafka', label: 'Kafka' },
   // { value: 'DataEngineering', label: 'DataEngineering' }, { value: 'DataVisualization', label: 'DataVisualization' },
   // { value: 'Snowflake', label: 'Snowflake' },
   // { value: 'AI & EMERGING TECH', label: 'AI & EMERGING TECH'}, { value: 'TensorFlow', label: 'TensorFlow'},
   // { value: 'PyTorch',label:'PyTorch'},{value:'NLP',label:'NLP'},{value:'ComputerVision',label:'ComputerVision'},
   // { value: 'ChatbotDevelopment', label: 'ChatbotDevelopment' }, { value: 'PromptEngineering', label: 'PromptEngineering' },
   // { value: 'LLMIntegration', label: 'LLMIntegration' },  { value: 'EdgeAI', label: 'EdgeAI' },
   // { value: 'Testing & QA', label: 'Testing & QA'}, { value: 'Selenium', label: 'Selenium'},
   // { value: 'Postman',label:'Postman'},{value:'JMeter',label:'JMeter'},{value:'TestNG',label:'TestNG'},
   // { value: 'ManualTesting', label: 'ManualTesting' }, { value: 'AutomationTesting', label: 'AutomationTesting' },
   // { value: 'BugTracking', label: 'BugTracking' }, 
   // { value: 'OPERATING SYSTEM', label: 'OPERATING SYSTEM'}, { value: 'WindowsOS', label: 'WindowsOS'},
   // { value: 'Linux',label:'Linux'},{value:'Ubuntu',label:'Ubuntu'},{value:'RedHat',label:'RedHat'},
   // { value: 'CentOS', label: 'CentOS' }, { value: 'Debian', label: 'Debian' },
   // { value: 'Fedora', label: 'Fedora' },  { value: 'MacOS', label: 'MacOS' },{ value: 'Unix', label: 'Unix' },
   // { value: 'AndroidOS', label: 'AndroidOS' }, 
   // { value: 'ChromeOS', label: 'ChromeOS' },
   // { value: 'SYSTEM ADMINISTRATION AND KERNEL-LEVEL', label: 'SYSTEM ADMINISTRATION AND KERNEL-LEVEL'}, { value: 'SystemAdmin', label: 'SystemAdmin'},
    //{ value: 'KernelDevelopment',label:'KernelDevelopment'},{value:'ShellScripting',label:'ShellScripting'},{value:'Bash',label:'Bash'},
   // { value: 'PowerShell', label: 'PowerShell' }, { value: 'SysOps', label: 'SysOps' },
   // { value: 'OSInternals', label: 'OSInternals' },  { value: 'ProcessManagement', label: 'ProcessManagement' },{ value: 'ThreadScheduling', label: 'ThreadScheduling' },
    //{ value: 'MemoryManagement', label: 'MemoryManagement' },
    //{ value: 'TESTING AND COMPATIBILITY', label: 'TESTING AND COMPATIBILITY'}, { value: 'OSCompatibilityTesting', label: 'OSCompatibilityTesting'},
    //{ value: 'DriverDevelopment',label:'DriverDevelopment'},{value:'Virtualization',label:'Virtualization'},{value:'Hypervisor',label:'Hypervisor'},
   // { value: 'VMWare', label: 'VMWare' }, { value: 'VirtualBox', label: 'VirtualBox' },
   // { value: 'SECURITY & ACCESS CONTROL', label: 'SECURITY & ACCESS CONTROL'}, { value: 'OSSecurity', label: 'OSSecurity'},
   // { value: 'AccessControl',label:'AccessControl'},{value:'SELinux',label:'SELinux'},{value:'UserPermissions',label:'UserPermissions'},
   // { value: 'FileSystemSecurity', label: 'FileSystemSecurity' }, 
    
    // ]
    
    // let TechTags = [
     // { value: 'SEASONAL FRUITS', label: 'ROLE'},
     // { value: 'EXOTIC FRUITS', label: 'ROLE'},
      
     // { value: 'Sw Developer', label: 'Sw Developer ' }, { value: 'Firmware Tester', label: 'Firmware Tester' },
     // { value: 'Backend developer', label: 'Backend developer' }, { value: 'Frontend developer', label: 'Frontend developer' },
     // { value: 'Mobile App Developer', label: 'Mobile App Developer' },
     // { value: 'DevOps Engineer', label: 'DevOps Engineer' },
    //  { value: 'Firmware Developer', label: 'Firmware Developer' }, { value: 'Hardware Engineer', label: 'Hardware Engineer' },
    //  { value: 'Data Analyst', label: 'Data Analyst' },
     //{ value: 'Scrum Master', label: "Scrum Master" },
    //{ value: 'Product Owner', label: 'Product Owner' }, { value: 'Product Line Manager', label: 'Product Line Manager' },
   // { value: 'Project Manager', label: 'Project Manager' }, { value: 'Automation Tester', label: 'Automation Tester' },
   // { value: 'QA Engineer', label: 'QA Engineer' }, { value: 'Senior Tester', label: 'Senior Tester' },
  //  { value: 'Manager', label: 'Manager' }, { value: 'Director', label: 'Director' },
  //  { value: 'Compliance Engineer', label: 'Compliance Engineer' },
   // { value: 'Verification Engineer', label: 'Verification Engineer' },
   // { value: 'QA Manager', label: 'QA Manager' }, { value: 'Verification Lead', label: 'Verification Lead' },
   // { value: 'Validation Engineer', label: 'Validation Engineer' },
   // { value: 'Testing Manager', label: 'Testing Manager' }, { value: 'Team Lead', label: 'Team Lead' },
   // { value: 'Senior Developer', label: 'Senior Developer' }, { value: 'Admin', label: 'Admin' },    
   // { value: 'Purchase', label: 'Purchase' },{ value: 'Finance', label: 'Finance' },   
   // { value: 'Recruiter', label: 'Recruiter' }, { value: 'Lab Technician', label: 'Lab Technician' },
   // { value: 'Store keeper', label: 'Store keeper' },
   // { value: 'Reliability Engineer', label: 'Reliability Engineer' },  // ]

  // let TOOLSPROTOCOLS =[
   // { value: 'TOOLS/PROTOCOLS', label: 'TOOLS/PROTOCOLS'},

   // { value: 'HP LoadRunner', label: 'HP LoadRunner' },
   // { value: 'jUnit', label: 'jUnit' },
   // { value: 'Agile', label: 'Agile' },
  //  { value: 'Jira', label: 'Jira' },
   // { value: 'Confluence', label: 'Confluence' },
    //{ value: 'Testrails', label: 'Testrails' },
    //{ value: 'PLC-SCADA', label: 'PLC-SCADA' },
    //{ value: 'ModBUS', label: 'ModBUS' },
    //{ value: 'CAN BUS', label: 'CAN BUS' },
  // ]
  // let INDUSTRY=[
   // { value: 'INDUSTRY', label: 'INDUSTRY' },

   // { value: 'Aerospace', label: 'Aerospace' },
    //{ value: 'IT', label: 'IT' },
   // { value: 'Banking', label: 'Banking' },
   // { value: 'Healthcare', label: 'Healthcare' },
   // { value: 'FMCG', label: 'FMCG' },
   // { value: 'Telecommunication', label: 'Telecommunication' },
   // { value: 'Multimedia', label: 'Multimedia' },
   // { value: 'Gaming', label: 'Gaming' },
   // { value: 'Defence', label: 'Defence' },
   // { value: 'Power', label: 'Power' },
   // { value: 'Security', label: 'Security' },
   // { value: 'Education', label: 'Education' },
  // ]
  // let JOB_TYPE=[
   // { value: 'Job Type', label: 'Job Type'},

   // { value: 'Full Time', label: 'Full Time' },
    //{ value: 'Contract', label: 'Contract' },
    //{ value: 'Internship', label: 'Internship' },
    //{ value: 'Part Time', label: 'Part Time' },
    //{ value: 'Work from Home', label: 'Work from Home' },
   // { value: 'Remote', label: 'Remote' },
    //{ value: 'Freelancer', label: 'Freelancer' },
    //{ value: 'On-Site', label: 'On-Site' },
   // { value: 'International Relocation', label: 'International Relocation' },
    //{ value: 'Frequent Traveling', label: 'Frequent Traveling' },
    //{ value: 'Temporary Assignment', label: 'Temporary Assignment' },
  // ]
  // let Experiance
 // { value: 'EXPERIENCE', label: 'EXPERIENCE'},

 // { value: '2 to 5 Yrs', label: '2 to 5 Yrs ' }, { value: '6 to 10 Yrs', label: '6 to 10 Yrs' },
 // { value: '11 to 15 Yrs', label: '11 to 15 Yrs' }, { value: '16 Yrs and above', label: '16 Yrs and above' },
  // let SALARY=[ 
   // { value: 'SALARY', label: 'SALARY'},

   // { value: '<10L', label: '<10L' },
    //{ value: '10 to 20L', label: '10 to 20L' },
    //{ value: '20 to 30L', label: '20 to 30L' },
    //{ value: '30 and above', label: '30 and above' },
  // ]

  // let NOTICE_PERIOD=[
    //{ value: 'NOTICE PERIOD', label: 'NOTICE PERIOD'},

    //{ value: 'Immediate', label: 'Immediate' },
    //{ value: '30days', label: '30days' },
    //{ value: '60days', label: '60days' },
  // ]

  // let COMPANY_TYPE=[
   // { value: 'COMPANY TYPE', label: 'COMPANY TYPE' },

    //{ value: 'Fortune500', label: 'Fortune500' },
    //{ value: 'MNC', label: 'MNC' },
    //{ value: 'Indian MNC', label: 'Indian MNC' },
    //{ value: 'Product Based', label: 'Product Based' },
    //{ value: 'Consulting', label: 'Consulting' },
    //{ value: 'Manpower sourcing', label: 'Manpower sourcing' },
    ///{ value: 'Firm', label: 'Firm' },
    //{ value: 'Pvt Ltd', label: 'Pvt Ltd' },
    //{ value: 'Start Up', label: 'Start Up' },
  // ]
  // let COLLEGE_TYPE=[
    //{ value: 'COLLEGE TYPE', label: 'COLLEGE TYPE' },

    //{ value: 'IITs-NITs', label: 'IITs-NITs' },
    //{ value: 'Top 100', label: 'Top 100' },
    //{ value: 'Top 500', label: 'Top 500' },
    //{ value: 'Other', label: 'Other' },
  // ]

  // let EDUCATION =[
   // { value: 'EDUCATION', label: 'EDUCATION' },

    //{ value: 'Phd', label: 'Phd' },
    //{ value: 'ME-MTech', label: 'ME-MTech' },
    //{ value: 'MBA', label: 'MBA' },
    //{ value: 'BE-BTECH', label: 'BE-BTECH' },
    //{ value: 'Diploma', label: 'Diploma' },
    //{ value: 'MCA-BCA', label: 'MCA-BCA' },
    //{ value: 'Bcom-BA', label: 'Bcom-BA' },
    //{ value: 'Others', label: 'Others' },
   

]
// 🖼️ Component
//function jobTags() {
//  return (
   // <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
    //  {jobTags.map((tag, index) => (
       // <div key={index} className={`tag-box ${tag.category}`}>
          //{tag.label}
        //</div>
      //))}
    //</div>
  //);
//}

export default jobTags;