const validPincodes = [
    // Delhi
    "110001", "110002", "110003", "110004", "110005", "110006", "110007", "110008", "110009", "110010",
    "110011", "110012", "110013", "110014", "110015", "110016", "110017", "110018", "110019", "110020",
    "110021", "110022", "110023", "110024", "110025", "110026", "110027", "110028", "110029", "110030",
    "110031", "110032", "110033", "110034", "110035", "110036", "110037", "110038", "110039", "110040",
    "110041", "110042", "110043", "110044", "110045", "110046", "110047", "110048", "110049", "110051",
    "110052", "110053", "110054", "110055", "110056", "110057", "110058", "110059", "110060", "110061",
    "110062", "110063", "110064", "110065", "110066", "110067", "110068", "110069", "110070", "110071",
    "110072", "110073", "110074", "110075", "110076", "110077", "110078", "110079", "110080", "110081",
    "110082", "110083", "110084", "110085", "110086", "110087", "110088", "110089", "110090", "110091",
    "110092", "110093", "110094", "110095", "110096",
  
    // Gurgaon
    "122001", "122002", "122003", "122004", "122005", "122006", "122007", "122008", "122009", "122010",
    "122011", "122012", "122013", "122014", "122015", "122016", "122017", "122018", "122019", "122020",
    "122021", "122022", "122023", "122024", "122025", "122026",
  
    // Noida
    // "201301", "201302", "201303", "201304", "201305", "201306", "201307", "201308", "201309", "201310",
    // "201311", "201312", "201313", "201314", "201315", "201316", "201317",
  
    // Ghaziabad
    "201001", "201002", "201003", "201004", "201005", "201006", "201007", "201008", "201009", "201010",
    "201011", "201012", "201013", "201014", "201015", "201016",
  
    // Faridabad
    "121001", "121002", "121003", "121004", "121005", "121006", "121007", "121008", "121009", "121010",
    "121011", "121012", "121013", "121014", "121015"
  ];
  

// Function to check if pincode is valid
function isPincodeValid(pincode) {
  return validPincodes.includes(pincode);
}