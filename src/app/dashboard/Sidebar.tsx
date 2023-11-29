"use client";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import GroupIcon from "@mui/icons-material/Group";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";
import { useAppSelector } from "@/redux/hooks";
import { logOut } from "@/redux/features/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import { generateRandomKey } from "@/utils/functions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Sidebar = ({ activeTab, setToggleSidebar }: any) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const { enqueueSnackbar } = useSnackbar();

  const navMenu = [
    {
      icon: <EqualizerIcon />,
      label: "Servicios",
      ref: "/dashboard/servicios",
      onClick: () => {},
    },
    {
      icon: <EqualizerIcon />,
      label: "Unidades",
      ref: "/dashboard/unidades",
      onClick: () => {},
    },
    {
      icon: <LogoutIcon />,
      label: "Cerrar sesión",
      ref: "/login",
      onClick: () => {
        dispatch(logOut());
        toast.success("Se ha deslogueado correctamente", {
          position: "top-center",
          autoClose: 3000,
          // hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        router.push("/ingreso");
      },
    },
  ];

  const user = useAppSelector((state: any) => state.userReducer.userSelected);

  // const handleLogout = () => {
  //   dispatch(logoutUser());
  //   enqueueSnackbar("Sesión cerrada satisfactoriamente", {
  //     variant: "success",
  //   });
  //   navigate("/login");
  // };

  return (
    <aside className="sidebar z-50 block min-h-screen fixed left-0 pb-14 max-h-screen w-4/4 w-64 bg-gray-800 text-white overflow-x-hidden border-r">
      <div className="flex items-center gap-3 bg-gray-700 p-2 rounded-lg shadow-lg my-4 mx-3.5">
        {/* <Avatar alt="Avatar" src={user.avatar.url} /> */}
        <div className="flex flex-col gap-0">
          <span className="font-medium text-lg">{user.nombreCompleto}</span>
          <span className="text-gray-300 text-sm">{user.correo}</span>
          <span className="text-gray-300 text-sm">
            {user.rolesUsuarios.tipo_rol}
          </span>
        </div>
        <button
          onClick={() => setToggleSidebar(false)}
          className="bg-gray-800 ml-auto rounded-full w-10 h-10 flex items-center justify-center"
        >
          <CloseIcon />
        </button>
      </div>

      {user && (
        <div className="flex flex-col w-full gap-0 my-8">
          {navMenu.map((item, index) => {
            const { icon, label, ref } = item;
            return (
              <div key={generateRandomKey()}>
                {label === "Cerrar sesión" ? (
                  <button
                    key={generateRandomKey()}
                    onClick={() => {
                      dispatch(logOut());
                      router.push("/ingreso");
                      toast.success("Se ha deslogueado correctamente", {
                        position: "top-center",
                        autoClose: 3000,
                        // hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "colored",
                      });
                    }}
                    className="hover:bg-gray-200 w-64 hover:text-gray-800 flex gap-3 items-center py-3 px-4 font-medium"
                  >
                    <span className="text-main-txtc1">{icon}</span>
                    <span className="text-main-txtc1">{label}</span>
                  </button>
                ) : (
                  <>
                    <Link
                      href={ref ? ref : "/"}
                      key={generateRandomKey()}
                      className={`${
                        activeTab === label
                          ? "bg-gray-700 hover:bg-gray-200"
                          : "hover:bg-gray-200"
                      } flex gap-3 hover:text-gray-800 items-center py-3 px-4 font-medium`}
                    >
                      <span className="text-main-txtc1">{icon}</span>
                      <span className="text-main-txtc1">{label}</span>
                    </Link>
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
