
const fetchDataWithToken = async (token,dataToSend) => {
    const url = "https://test-share.shub.edu.vn/api/intern-test/output";

    try {
        const response = await fetch(url, {
            method: 'POST', // Specify the method
            headers: {
                'Authorization': `Bearer ${token}`, // Bearer token
                'Content-Type': 'application/json', // Specify content type
            },
            body: JSON.stringify(dataToSend), // Convert data to JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json(); // Parse the response as JSON
        console.log('Response from API:', responseData);
    } catch (error) {
        console.error('Error sending data:', error);
    }
};



const fetchData = async () => {
    try {
        const response = await fetch("https://test-share.shub.edu.vn/api/intern-test/input");
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null; // Return null to indicate an error
    }
};

const solve = async () => {
    const dataFetching = await fetchData();

    if (!dataFetching) {
        console.error("Failed to fetch data.");
        return; // Exit the function if fetching failed
    }

    const { token, data, query } = dataFetching;

    let temp_arr = [];
    temp_arr.push(data[0]);
    temp_arr.push(data[1]);
    let res_arr = [];

    for (let i = 2; i < data.length; i++) {
        temp_arr[i] = data[i] + temp_arr[i - 2];
    }

    for (const q of query) {
        let { type, range } = q;
        let [l, r] = range;

        r = Math.min(r, data.length - 1);
        if (l > r) {
            continue;
        }

        let temp1_evenSum = temp_arr[r - (r % 2)] - ((l === 0) ? 0 : temp_arr[Math.floor((l - 1) / 2) * 2]);
        let temp1_oddSum = temp_arr[r - ((r - 1) % 2)] - ((l === 0 || l === 1) ? 0 : temp_arr[2 * Math.floor((l - 2) / 2) + 1]);

        if (type === "1") {
            res_arr.push(temp1_evenSum + temp1_oddSum);
        } else {
            res_arr.push(temp1_evenSum - temp1_oddSum);
        }
    }
    fetchDataWithToken(token,res_arr)
};


solve();
