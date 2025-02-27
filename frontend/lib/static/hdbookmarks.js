

// Items that would copy to clipboard
const copyLink = {
    "Haiku Server and Path": 
    `Server = ercd-sproxy.urmc.rochester.edu 
    Path = soapproxies-haiku`,
    "Dimensions Tenant URL": "https://univofrochester.prd.mykronos.com",
    "SCCM Computer Name": "SYSMGMTADMIN",
    "Pager Number": "+15852209506",
    "PACS Access URL": "https://urmcprod.service-now.com/sp?id=sc_cat_item&sys_id=78999f871bd5511089d184c3604bcbd0",
    "eRecord Training Request URL": "https://urmcprod.service-now.com/sp?id=sc_cat_item&table=sc_cat_item&sys_id=cb6380f6db42f340646c273605961941&searchTerm=Training", 
    "Cadance Build Request": "https://urmcprod.service-now.com/sp?id=sc_cat_item_guide&table=sc_cat_item&sys_id=8f132f6a1b8d551065bec9d3604bcbc5&searchTerm=cadence",
  };

  // New way of storing links for HDBooksmarks (Name, Link, Picture, Description)
all_links = [
    ["Global Protect","https://portal.vpn.urmc.rochester.edu", "GP.png", "GP install link for remote users"],
    ["Cisco AnyConnect", "https://webvpn.urmc.rochester.edu", "Cisco.png", "Cisco install link for remote users"],
    ["Internal Service Now","https://urmcprod.service-now.com", "Internal_SN.png", ""],
    ["Knowledge Vault", "https://acute-reminder-436.notion.site/Knowledge-Vaults-619e147511424be38961c00734e0d540", "Vault.png", "Dustin Notes"],
    ["Service Portal", "https://urmcprod.service-now.com/sp", "Service_Portal.png", "Callers can put in request rather than calling"],
    ["Zoom Status", "https://status.zoom.us/", "Zoom_Status.png", "Gives the status of Zoom"],
    ["Office Status", "https://portal.office.com/servicestatus", "Microsoft_Office_Status.png", "Gives the status of Microsoft Office"],
    ["Down Detector", "https://downdetector.com/", "Down_Detector.png", "Check to see if application are down"],
    ["URMC App Status","https://apps.mc.rochester.edu/Sysstat/", "URMC_System_Status.png", "Provide status of application own by URMC"],
    ["UIT Alerts", "https://tech.rochester.edu/alerts/", "UIT_Alerts.png", "Active Alerts from UIT"],
    ["Desktop Triage", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0014551", "Desktop_Triage.png", "SN KB that provides insight as to where CTS tickets should go"],
    ["On-Call Schedules/Vacation Calendar", "https://apps.mc.rochester.edu/Staff2/ISD", "Staff_System.png", "Request time off"],
    ["Exec Management Triage Sheet", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0011376", "Executive_Management.png", "Lists which techs are responsible for which Exec"],
    ["Help Desk SharePoint", "https://uofr.sharepoint.com/sites/ISDServiceDesk/SitePages/CollabHome.aspx", "ISD_SharePoint.png", ""],
    ["Major Incident Script/Level 1", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0010422", "L1A.png", "Instructions to create L1A"],
    ["SharePoint Owners", "https://appdev.mc.rochester.edu/isd/UrlSupport/Home/", "SharePoint_Owners.png", "Search Sharepoint URL to find owners"],
    ["Print Queue Report", "https://apps.mc.rochester.edu/ISD/SIG/PrintQueues/", "Print_Queue.png", "Full List of network printers"],
    ["Desktop Repair Matrix", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0015483", "Destop_Repiar_Matrix.png", "Shows which models of computers can be replaced"],
    ["System Summary Index", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0014512", "System_Summary_Index.png", "Gardner's List of KBs"],
    ["Important Phone Numbers", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0014676", "Important_Numbers.png", ""],
    ["DOH Quick Sheet", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0015713", "NYS_DOH.png", "CLICK HERE FOR ALL Department of Health Calls"],
    ["Mac Password KB", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0010262", "MAC_Password.png", ""],
    ["Clear disk space\User Profiles", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0015613", "Remove_Old_Profile.png", "SN KB for clearing disk space properly"],
    ["NEC Desk Phone Guide", "https://tech.rochester.edu/wp-content/uploads/8_12_24_32_Quick_Reference_Guide.pdf", "NEC_PDF.png", "Helpful PDF guide to onsite deskphones"],
    ["Keywords Guide", "file:\\NTSDRIVE05\Cust_Serv\Help Desk Info\Help Desk PC Setup Docs\Home Grown Tools\Bookmarks\Assests\Copy of eRecord Key Words Guide.xlsm", "Keyword_Guide_eRecord.png", "Download of the keywords guide"],
    ["In Patient", "http://sharepoint.mc.rochester.edu/sites/eRecLibrary/Docs/Misc/erecord-clinical-leaders-list.pdf", "In_Patient.png", "eRecord Super Users"],
    ["AMB", "http://sharepoint.mc.rochester.edu/sites/eRecLibrary/Docs/Misc/ambulatory-lead-smes.xlsx", "AMB_Excel.png", "eRecord Super Users download"],
    ["Old LMS", "file://NTSDRIVE05/ISD_share/Cust_Serv/Help Desk Info/Training Daily Completions", "Old_lms.png", "Excel file containing all LMS prior 2024"],
    ["eRecord Training [Sumtotal]", "https://urmc.sumtotal.host/", "LMS_page.png", ""],
    ["Chart Correction Guide", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0014549", "eRecord_Corrections.png", ""],
    ["Gardner's Guide to eRecord", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0015320", "Common_eRecord_Issues.png", "Common eRecord issues"],
    ["Name Change Script", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0010766", "Name_Change_Script.png", "SN KB for Name changes"],
    ["MyIdentity PROD", "https://myidentity.rochester.edu/itim/console/jsp/logon/Login.jsp", "myIdentity_Prod.png", "This links to PROD1 ITIM Console for password changes"],
    ["MyIdentity Admin", "https://myidentity.rochester.edu/identity/admin/LoginResults.jsp", "myIdentity_Admin.png", "Allows search via URID, NETID, SSN, DOB, and Name"],
    ["Compromised Accounts", "https://myidentity.rochester.edu/cast/", "Compromised_Account.png", "Check status of someones account"],
    ["Extranet Password Reset", "https://extranet.urmc.rochester.edu/ChangePass/", "URMC_Password_Change.png", "Use Citrix if Remote"],
    ["AD Account Grid", "https://confluence.rochester.edu/display/UNIVITIDM/IdM+Account+Grid+For+ISD+Help+Desk", "Account_Grid.png", "Master guide to URMC Accounts"],
    ["Guest Account Documentation", "https://confluence.rochester.edu/display/UNIVITIDM/Guest+Account+System+Help+Desk+Support+Documentation+Main+Page", "Guest_Account_System.png", ""],
    ["Duo Admin", "https://www.rochester.edu/it/security/duo/helpdesk/?domain=urmc", "DUO.png", "Manage DUO accounts"],
    ["Guest Account System", "https://myidentity.rochester.edu/guest/", "Create_Guest_Account_System.png", "Create sponsored accounts"],
    ["DUO Enrollment Portal", "https://www.rochester.edu/it/security/duo/enrollment/index.php?domain=urmc-sh", "DUO_Enrollment.png", "Customer Facing DUO Management *MUST BE ONSITE*"],
    ["Director\Citrix Remote Viewer", "https://director.urmc-sh.rochester.edu", "Director.png", "Allows shadowing of any Citrix instance"],
    ["Exe Tools for HD", "file://NTSDRIVE05/ISD_Share/Cust_Serv/Help Desk Info/Tools/Tools", "HD_Tools.png", "Multiple tools for use for the HelpDesk"],
    ["BitLocker Script", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0010842", "BitLocker.png", ""],
    ["BitLocker Console", "https://mbamsql.urmc-sh.rochester.edu/Reports/", "BitLocker_Console.png", "NEED FIRST 8 CHAR OF KEY ID"],
    ["HDAMU & DMD", "file://nt014/AdminApps/Utils/AD Utilities", "AD_Utils.png", ""],
    ["Common AD Groups", "file://ntsdrive05/isd_share/Cust_Serv/Help Desk Info/Tools/HDBookmarks_2.0/Common AD Groups.HTML", "Common_Ad_Groups.png", "Compiled list of common AD Groups that HD grants"],
    ["Box Admin", "https://rochester.app.box.com/master/users", "Box_Admin.png", "Manage Box Accounts"],
    ["JAMF PRO", "https://jss.urmc.rochester.edu:8443", "Jamf.png", "Mobile Device Management [MDM] Console"],
    ["Joseph Patrick's HelpDesk Tool", "file://ntsdrive05/isd_share/Cust_Serv/Help Desk Info/Help Desk PC Setup Docs/Home Grown Tools", "HelpDeskTool.png", ""],
    ["Onbase Admin Console", "https://onbasedms.urmc-sh.rochester.edu/AppNetNT/Login.aspx", "OnBase_Console.png", "Allows HD to unlock Onbase Acc"],
    ["Pharos", "http://its-pharos-wp01.ur.rochester.edu/uniprint/packages.asp", "Pharos.png", "These are special downloaded printers"],
    ["Drop Box", "https://rochester.account.box.com/login", "Box.png", ""],
    ["Microsoft OneDrive Login", "https://onedrive.live.com/login/", "Onedrive.png", ""],
    ["312 Rec Form", "https://sharepoint19.mc.rochester.edu/sites/URMFGALL/resourcesandreferences/Forms/Capital%20Forms/312%20Requisition%20Form.pdf#search=312", "312Form.png", ""],
    ["Request Imaging Access", "https://urmcprod.service-now.com/sp?id=sc_cat_item&sys_id=78999f871bd5511089d184c3604bcbd0", "Imaging_Request.png", ""],
    ["WebMSO", "https://webmso.urmc-sh.rochester.edu/privinq/msopi.aspx#Scroll", "WebMSO.png", ""],
    ["Tech Recycling", "https://tech.rochester.edu/services/it-equipment-recovery-program/", "Recycle_Program.png", ""],
    ["Shared Drive Request", "https://urmcprod.service-now.com/sp?id=sc_cat_item&sys_id=38d2347adb6b1380646c27360596195b", "Share_Drive.png", ""],
    ["DL and Email Request", "https://urmcprod.service-now.com/sp?id=sc_cat_item&sys_id=e9d8d648dbbf9300eff5eda5ca961907&sysparm_category=7235974c1b6fb810ca3acae5604bcb7e&catalog_id=-1", "DL.png", ""],
    ["Access Another Users Information", "https://urmcprod.service-now.com/sp?id=sc_cat_item&sys_id=728479151b8989109fefc804604bcb08&sysparm_category=f79284901ba3f810ca3acae5604bcb71", "Data_Access.png", ""],
    ["Critical Termination", "https://urmcprod.service-now.com/sp?id=sc_cat_item&sys_id=884739521b618d10ca3acae5604bcb27&sysparm_category=f79284901ba3f810ca3acae5604bcb71", "Crit_Term.png", ""],
    ["Adobe Pro Licenses", "https://licensing.adobe.com/sap/bc/bsp/sap/zavllogin/login.htm", "Adobe.png", ""],
    ["URSecure Pay\WellsFargo", "https://online.wfhealthcarepatientpay.com/providers/Form/Account/Login", "Wells.png", ""],
    ["GNAV 10.3", "https://rochester.app.box.com/s/mzhsfsxpwvjhb4tl7i2a8tjsh1rqwdkn", "GNAVOLD.png", ""],
    ["Official Teams Install", "https://go.microsoft.com/fwlink/p/?LinkID=2187327&clcid=0x409&culture=en-us&country=US", "Teams_Download.png", ""],
    ["Haiku", "https://urmcprod.service-now.com/kb_view.do?sysparm_article=KB0013535", "Haiku.png", "Server = ercd-sproxy.urmc.rochester.edu<br/>Path = soapproxies-haiku"],
    ["MyIdentity Template Viewer", "https://myidentity.rochester.edu/urmctemplateviewer/templates.jsp", "TemplateViewer.png", ""],
    ["MyURHR & Workday", "https://www.rochester.edu/human-resources/myurhr/", "myURHR.png", ""],
]

document.getElementById("filter").focus()

filterSearch()


// Using the filter field to filter the links
function filterSearch() {
    let build = "";
    const filter =  document.getElementById("filter")
    let links = document.getElementById("links");

    links.innerHTML = "";

    all_links.sort()


    if (filter.value != "") {
        var regex = new RegExp(filter.value.toLowerCase());

        // Go through each element in links and checks to if they have input inside of it
        all_links.forEach(element => {
            if (regex.test(element[0].toLowerCase()) || regex.test(element[3].toLowerCase())) {
                build += `
<a class="link" href="${element[1]}" target="_blank" tabindex="0">
    <div>
        <img src="../assets/${element[2]}" loading="lazy"/>
    </div>
    <h1>${element[0]} </h1>
    <p>${element[3]}</p>
</a>
 ` 
            }
            
        });

    }
    // If filter is empty shows all links
    else {
        all_links.forEach(element => {
            build += `
<a class="link" href="${element[1]}" target="_blank" tabindex="0">
    <div>
        <img src="../assets/${element[2]}" loading="lazy"/>
    </div>
    <h1>${element[0]} </h1>
    <p>${element[3]}</p>
</a>
 ` 
        });
    }

    if (build === "") {
        build += `No result match \"${filter.value}\"`;
    }
    links.innerHTML = build;
       
    document.documentElement.scrollTop = 0;
}


// Copies based on buttons pressed
function copyToClipboard(button) {
    navigator.clipboard
        .writeText(copyLink[button.children[0].innerHTML])
        .then(function () {
            button.children[2].innerHTML = "Copied";
        })
        .catch(function () {
            button.children[2].innerHTML = "Failed to Copy";
        });

    setTimeout(function () {
        button.children[2].innerHTML = "Click to Copy";
    }, 1000);
}

// When pressing enter on the input field it will bring you to first link shown
function goToFirstLink(event) {
    event.preventDefault();
    const filter = document.getElementById("filter");
    let links = document.getElementById("links");

    if (links.children.length == 0) {
        filter.value = "";
        return;
    }

    links.children[0].click();

    filter.value = "";
    filterSearch();
}

