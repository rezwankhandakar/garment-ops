// // import { useQuery } from "@tanstack/react-query";
// // import useAxiosSecure from "../Hooks/useAxiosSecure";


// // const ManageUsers = () => {
// //   const axiosSecure = useAxiosSecure();

// //   const { data: users = [], isLoading, isError } = useQuery({
// //     queryKey: ["users"],
// //     queryFn: async () => {
// //       const res = await axiosSecure.get("/users");
// //       return res.data;
// //     },
// //   });

// //   if (isLoading) {
// //     return <div className="text-center mt-10">Loading users...</div>;
// //   }

// //   if (isError) {
// //     return <div className="text-center text-red-500">Failed to load users</div>;
// //   }

// //   return (
// //     <div className="p-6">
// //       <h2 className="text-2xl font-semibold mb-6">
// //         Manage Users ({users.length})
// //       </h2>

// //       <div className="overflow-x-auto">
// //         <table className="table table-zebra w-full">
// //           <thead className="bg-base-200">
// //             <tr>
// //               <th>#</th>
// //               <th>Name</th>
// //               <th>Email</th>
// //               <th>Role</th>
// //               <th>Actions</th>
// //             </tr>
// //           </thead>

// //           <tbody>
// //             {users.map((user, index) => (
// //               <tr key={user._id}>
// //                 <td>{index + 1}</td>
// //                 <td className="font-medium">{user.name}</td>
// //                 <td>{user.email}</td>
// //                 <td>
// //                   <span
// //                     className={`badge ${
// //                       user.role === "admin"
// //                         ? "badge-error"
// //                         : user.role === "manager"
// //                         ? "badge-warning"
// //                         : "badge-info"
// //                     }`}
// //                   >
// //                     {user.role}
// //                   </span>
// //                 </td>
// //                 <td className="space-x-2">
// //                   <button className="btn btn-xs btn-outline btn-success">
// //                     Make Admin
// //                   </button>
// //                   <button className="btn btn-xs btn-outline btn-warning">
// //                     Make Manager
// //                   </button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ManageUsers;



// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../Hooks/useAxiosSecure";

// const ManageUsers = () => {
//   const axiosSecure = useAxiosSecure();

//   const {
//     data: users = [],
//     isLoading,
//     isError,
//     refetch,
//   } = useQuery({
//     queryKey: ["users"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users");
//       return res.data;
//     },
//   });

//   const handleMakeAdmin = async (id) => {
//     try {
//       await axiosSecure.patch(`/users/admin/${id}`);
//       refetch();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleMakeManager = async (id) => {
//     try {
//       await axiosSecure.patch(`/users/manager/${id}`);
//       refetch();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   if (isLoading) {
//     return <div className="text-center mt-10">Loading users...</div>;
//   }

//   if (isError) {
//     return (
//       <div className="text-center text-red-500">
//         Failed to load users
//       </div>
//     );
//   }

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-semibold mb-6">
//         Manage Users ({users.length})
//       </h2>

//       <div className="overflow-x-auto">
//         <table className="table table-zebra w-full">
//           <thead className="bg-base-200">
//             <tr>
//               <th>#</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((user, index) => (
//               <tr key={user._id}>
//                 <td>{index + 1}</td>
//                 <td className="font-medium">{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>
//                   <span
//                     className={`badge ${
//                       user.role === "admin"
//                         ? "badge-error"
//                         : user.role === "manager"
//                         ? "badge-warning"
//                         : "badge-info"
//                     }`}
//                   >
//                     {user.role}
//                   </span>
//                 </td>
//                 <td className="space-x-2">
//                   {user.role !== "admin" && (
//                     <button
//                       onClick={() => handleMakeAdmin(user._id)}
//                       className="btn btn-xs btn-outline btn-success"
//                     >
//                       Make Admin
//                     </button>
//                   )}

//                   {user.role !== "manager" && (
//                     <button
//                       onClick={() => handleMakeManager(user._id)}
//                       className="btn btn-xs btn-outline btn-warning"
//                     >
//                       Make Manager
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;


import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user: loggedUser } = useAuth(); // current logged-in user

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // ===== Reusable confirm =====
  const confirmAction = async (title, text) => {
    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, do it!",
    });
    return result.isConfirmed;
  };

  // ===== Role Handlers =====
  const handleRoleChange = async (id, role) => {
    const ok = await confirmAction(
      "Are you sure?",
      `This user will be a ${role}`
    );
    if (!ok) return;

    await axiosSecure.patch(`/users/${role}/${id}`);
    refetch();

    Swal.fire("Success!", `User is now ${role}`, "success");
  };

  // ===== Status Handlers =====
  const handleSuspend = async (targetUser) => {
    if (targetUser.email === loggedUser?.email) {
      return Swal.fire(
        "Action blocked",
        "You cannot suspend yourself",
        "error"
      );
    }

    const ok = await confirmAction(
      "Suspend user?",
      "This user will not be able to access the system"
    );
    if (!ok) return;

    await axiosSecure.patch(`/users/suspend/${targetUser._id}`);
    refetch();

    Swal.fire("Suspended!", "User has been suspended", "success");
  };

  const handleUnsuspend = async (id) => {
    await axiosSecure.patch(`/users/unsuspend/${id}`);
    refetch();

    Swal.fire("Activated!", "User account restored", "success");
  };

  if (isLoading) {
    return <div className="text-center mt-10">Loading users...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-red-500">
        Failed to load users
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">
        Manage Users ({users.length})
      </h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead className="bg-base-200">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u, index) => (
              <tr key={u._id}>
                <td>{index + 1}</td>

                <td className="font-medium">{u.name}</td>
                <td>{u.email}</td>

                {/* Role */}
                <td>
                  <span
                    className={`badge ${
                      u.role === "admin"
                        ? "badge-error"
                        : u.role === "manager"
                        ? "badge-warning"
                        : "badge-info"
                    }`}
                  >
                    {u.role || "buyer"}
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span
                    className={`badge ${
                      u.status === "suspended"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {u.status || "active"}
                  </span>
                </td>

                {/* Actions */}
                <td className="space-x-2 space-y-1">
                  {u.role !== "admin" && (
                    <button
                      onClick={() =>
                        handleRoleChange(u._id, "admin")
                      }
                      className="btn btn-xs btn-outline btn-success"
                    >
                      Make Admin
                    </button>
                  )}

                  {u.role !== "manager" && (
                    <button
                      onClick={() =>
                        handleRoleChange(u._id, "manager")
                      }
                      className="btn btn-xs btn-outline btn-warning"
                    >
                      Make Manager
                    </button>
                  )}

                  {u.role !== "buyer" && (
                    <button
                      onClick={() =>
                        handleRoleChange(u._id, "buyer")
                      }
                      className="btn btn-xs btn-outline btn-info"
                    >
                      Make Buyer
                    </button>
                  )}

                  {u.status !== "suspended" ? (
                    <button
                      onClick={() => handleSuspend(u)}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      Suspend
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnsuspend(u._id)}
                      className="btn btn-xs btn-outline btn-success"
                    >
                      Unsuspend
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
