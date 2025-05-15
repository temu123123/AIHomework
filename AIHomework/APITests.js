async function testFakeStoreAPI() {
    try {
        // Make GET request to the API
        const response = await fetch('https://fakestoreapi.com/products');
        
        // Test 1: Verify server response code
        if (response.status !== 200) {
            console.error(`Test Failed: Expected status code 200, got ${response.status}`);
            return;
        }
        console.log('Test Passed: Server response code is 200');

        // Parse JSON data
        const products = await response.json();
        
        // Initialize array to store defective products
        const defectiveProducts = [];

        // Test 2: Verify product attributes
        products.forEach((product, index) => {
            const defects = [];

            // Check if title is present and not empty
            if (!product.title || product.title.trim() === '') {
                defects.push('Title is missing or empty');
            }

            // Check if price is non-negative
            if (!product.price || product.price < 0) {
                defects.push('Price is missing or negative');
            }

            // Check if rating.rate is present and does not exceed 5
            if (!product.rating || product.rating.rate === undefined || product.rating.rate > 5) {
                defects.push('Rating is missing or exceeds 5');
            }

            // If defects found, add to defectiveProducts
            if (defects.length > 0) {
                defectiveProducts.push({
                    productId: product.id,
                    title: product.title || 'N/A',
                    defects: defects
                });
            }
        });

        // Output results
        console.log('\nTest Results:');
        if (defectiveProducts.length === 0) {
            console.log('No defective products found.');
        } else {
            console.log(`Found ${defectiveProducts.length} defective products:`);
            defectiveProducts.forEach((prod, index) => {
                console.log(`Product ${index + 1} (ID: ${prod.productId}, Title: ${prod.title}):`);
                prod.defects.forEach(defect => console.log(`  - ${defect}`));
            });
        }

    } catch (error) {
        console.error('Error during API testing:', error.message);
    }
}

// Execute the tests
testFakeStoreAPI();