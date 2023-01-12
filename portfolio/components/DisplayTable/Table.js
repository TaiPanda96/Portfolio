const DataTable = ({ data }) => {
    const headers = data[0] && Object.keys(data[0]);
    return (
        // Align the table to the center of the page
        <div class="flex justify-center overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="py-2 inline-block min-w-full sm:px-4 lg:px-6">
                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="border-b">
                            <tr> {headers.map((heading) =>
                                <th scope="col" class="text-sm font-large text-gray-900 px-6 py-4">
                                    {heading}
                                </th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row) => (
                                <tr class="bg-white border-b">
                                    {headers.map((heading) =>  
                                        <td text-sm text-gray-950 font-light px-4 py-4 whitespace>
                                            {row[heading]}
                                        </td>)
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default DataTable