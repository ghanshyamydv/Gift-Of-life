import React, { useEffect } from 'react'

function Contribute() {
  // useEffect(()=>{
  //   const fetchData= async ()=>{
  //     const data=await fetch("http://localhost:4000/")
  //     console.log(await data.json());
  //   }

  //   fetchData();

  // },[])
  // useEffect(()=>{
  //   const fetchData= async ()=>{
  //     const response=await fetch("http://localhost:4000/donor-register",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           title: "My Post",
  //           body: "This is the body of the post.",
  //           userId: 1,
  //         }),
  //       }
  //     );
  //     const data = await response.json();
  //     console.log("Response data:", data);
  //   }

  //   fetchData();

  // },[])




  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Define an async function to fetch data
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("https://jsonplaceholder.typicode.com/posts"); // Example API
  //       setData(response.data); // Update the state with the fetched data
  //       setLoading(false); // Mark loading as complete
  //     } catch (err) {
  //       setError(err.message); // Set the error message
  //       setLoading(false); // Mark loading as complete even if there is an error
  //     }
  //   };

  //   fetchData();
  // }, []); // Empty dependency array means this runs once when the component mounts

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;
  return (
    <div>
      <h1>Contribute Page</h1>
      
    </div>
  )
}

export default Contribute
