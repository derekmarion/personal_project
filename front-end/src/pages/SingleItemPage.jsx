import { useEffect, useState } from "react";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";
import { api } from "../utilities";

export const SingleItem = () => {
  const { user, setUser } = useOutletContext();
  const [item, setItem] = useState([]);
  const { id } = useParams();
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

  //Value declaration for item fields
  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(1.0);
  const [serial_num, setSerial_Num] = useState("SN12345");
  const [file, setFile] = useState(null);

  const getSingleItem = async () => {
    try {
      const response = await api.get(`inventories/all_items/${id}/`, {
        email: user,
      });
      //update stateful fields with item's current data
      setItem(response.data);
      setCategory(item.category);
      setName(item.name);
      setQuantity(item.quantity);
      setPrice(item.price);
      setSerial_Num(item.serial_num);
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();
    let data = {
      name: name,
      category: category,
      quantity: quantity,
      price: price,
      serial_num: serial_num,
    };
    try {
      const response = await api.put(`/inventories/all_items/${id}/`, data);
      if (file !== null) {
        const formData = new FormData();
        formData.append("file", file);
        const fileUploadResponse = await api.post(
          `/files/upload/${id}/`,
          formData
        );
      }
      setItem(response.data);
      setEditing(false);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    getSingleItem();
  }, []);

  const uploadFile = (e) => {
    setFile(e.target.files[0]);
  };

  const deleteItem = async (id) => {
    try {
      const response = await api.delete(`inventories/all_items/${id}/`);
      // Navigate back to inventory page
      navigate("/inventory/all_items")
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-4 mt-20 w-96">
        {editing ? (
          // Editing item
          <form onSubmit={(e) => updateItem(e)}>
            <h3 className="text-lg font-semibold mb-2">
              Name:{" "}
              <input
                type="text"
                placeholder={item.name}
                onChange={(e) => setName(e.target.value)}
                className="border"
              />
            </h3>
            <p className="text-gray-600 mb-2">
              Category:{" "}
              <input
                type="text"
                placeholder={item.category}
                onChange={(e) => setCategory(e.target.value)}
                className="border"
              />
            </p>
            <p className="text-gray-600 mb-2">
              Quantity:{" "}
              <input
                type="text"
                placeholder={item.quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="border"
              />
            </p>
            <p className="text-gray-600 mb-2">
              Price:{" "}
              <input
                type="text"
                placeholder={item.price}
                onChange={(e) => setPrice(e.target.value)}
                className="border"
              />
            </p>
            <p className="text-gray-600 mb-2">
              Serial Number:{" "}
              <input
                type="text"
                placeholder={item.serial_num}
                onChange={(e) => setSerial_Num(e.target.value)}
                className="border"
              />
            </p>
            <p className="text-gray-600 mb-2">
              Proof of Purchase:{" "} {/*rThis should not be editable. Upload File below if None*/}
              <input
                type="text"
                placeholder={item.file_name}
                onChange={(e) => setSerial_Num(e.target.value)}
                className="border"
              />
            </p>
            <input type="file" onChange={(e) => uploadFile(e)} className=" mb-3"/>
            <input
              className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-700"
              type="submit"
              value="Save"
            />
            <button
              className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-700 ml-2"
              onClick={() => setEditing(false)}
            >
              Cancel
            </button>
          </form>
        ) : (
          // Viewing item
          <>
            <h3 className="text-lg font-semibold mb-2">Name: {item.name}</h3>
            <p className="text-gray-600 mb-2">Category: {item.category}</p>
            <p className="text-gray-600 mb-2">Quantity: {item.quantity}</p>
            <p className="text-gray-600 mb-2">Price: ${item.price}</p>
            <p className="text-gray-600 mb-2">
              Serial Number: {item.serial_num}
            </p>
            <p className="text-gray-600 mb-2">
              Proof of Purchase: {item.file_name}
            </p>
            <div className="flex justify-between">
              <button
                className="bg-slate-900 text-white px-4 py-2 rounded-full hover:bg-slate-700"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
              <button
                onClick={() => deleteItem(item.id)}
                className="bg-red-700 text-white px-4 py-2 rounded-full hover:bg-red-900 ml-auto"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
