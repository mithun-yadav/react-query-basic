import { Box, CircularProgress } from "@mui/material";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

const Product = () => {
  const params = useParams();
  const mutation = useMutation({
    mutationFn: (newProduct) => {
      return axios.put(
        `https://dummyjson.com/products/${params.productId}`,
        newProduct
      );
    },
  });
  console.log(params.productId);

  async function singleProduct() {
    const val = await axios.get(
      `https://dummyjson.com/product/${params.productId}`
    );
    return val?.data;
  }
  const {
    isLoading,
    data: product,
    error,
  } = useQuery({
    queryKey: ["product", params.productId], // The passed query is used by the react-query to do caching
    queryFn: singleProduct,
    // staleTime: Infinity,
  });

  console.log(product, "val");

  //   if (isLoading) {
  //     return (
  //       <Box
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: "100vh",
  //         }}
  //       >
  //         <CircularProgress />
  //       </Box>
  //     );
  //   }

  if (mutation.isLoading) {
    return <div>Loading...</div>;
  }
  if (mutation.error) {
    return <div>{mutation.error.message}</div>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }
  if (product) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div className="w-[300px]">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80 object-cover">
            <img
              alt={product.title}
              src={product.images}
              className="h-full w-full object-cover object-center lg:h-full lg:w-full"
            />
          </div>
          <div className="mt-4 flex justify-between">
            <div>
              <h3 className="text-sm text-gray-700">
                <div>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.title}
                </div>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.category}</p>
            </div>
            <p className="text-sm font-medium text-gray-900">{product.price}</p>
          </div>
          <button
            onClick={() => {
              console.log("jkfk");

              mutation.mutate({ title: "Hello It is a title" });
            }}
            className="border p-2"
          >
            Click Me
          </button>
        </div>
      </div>
    );
  }
};

export default Product;
