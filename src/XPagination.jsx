import React, { useEffect, useState } from "react";

const Pages = () => {
    const [ employees, setEmployees ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const rowsPerPage = 10;

    const fetchEmployee = async () => {
        try{
            const response = await fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json`);
            if(!response.ok){
                throw new Error("Failed to fetch Employee Data...");
            }
            const data = await response.json();
            setEmployees(data);
            console.log(setEmployees);
        } catch(error) {
            console.error("Failed to fetch data");
            alert("Failed to fetch data");
        }
    }

    useEffect (() => {
        fetchEmployee();
    }, []);


    const indexOfLastEmployee = currentPage * rowsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPages = Math.ceil(employees.length / rowsPerPage);


    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    // const columnWidth = "200px";


    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100vh"
            }}
        >
            <h1 style={{display: "flex", justifyContent: "center"}}>Employee Data Table</h1>
            
            <div style={{ flex: 1, overflowY: "visible" }}>
                <table
                    style={{
                        borderCollapse: "collapse",
                        width: "100%"
                    }}
                >
                    <thead
                        style={{
                            backgroundColor: "#009879",
                            color: "#FFFFFF",
                            textAlign: "left",
                            height: "50px"
                        }}
                    >
                        <tr>
                            <th style={{ padding: "10px 0px 10px 20px", width: "15%" }}>ID</th>
                            <th style={{ padding: "10px", width: "20%" }}>Name</th>
                            <th style={{ padding: "10px", width: "45%" }}>Email</th>
                            <th style={{ padding: "10px", width: "20%" }}>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentEmployees.map((emp, index) => (
                            <tr 
                                key={emp.id}
                                style={{
                                    height: "50px",
                                    borderBottom: index === currentEmployees.length - 1 ? "2px solid #009879" : "1px solid #E3E3E3",
                                }}
                            >
                                <td style={{ padding: "10px 0px 10px 20px", width: "15%" }}>{emp.id}</td>
                                <td style={{ padding: "10px", width: "20%" }}>{emp.name}</td>
                                <td style={{ padding: "10px", width: "45%" }}>{emp.email}</td>
                                <td style={{ padding: "10px", width: "20%" }}>{emp.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    marginBottom: "20px",
                    gap: "15px"
                }}
            >
                <button
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "30px",
                        backgroundColor: "#009879",
                        color: "#FFFFFF",
                        borderRadius: "5px",
                        borderColor: "transparent"
                    }}
                    onClick={handlePrevClick} 
                >
                    Previous
                </button>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "30px",
                        width: "30px",
                        backgroundColor: "#009879",
                        color: "#FFFFFF"
                    }}
                >
                    {currentPage}
                </div>

                <button
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "30px",
                        backgroundColor: "#009879",
                        color: "#FFFFFF",
                        borderRadius: "5px",
                        borderColor: "transparent"
                    }}
                    onClick={handleNextClick} 
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Pages;