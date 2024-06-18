
import { GETUSERS } from "@/Graphql/Schema";
import { useQuery } from "@apollo/client";
import Link from "next/link";

export default function Home() {
    const { data, loading, error } = useQuery(GETUSERS);


    if (loading) {
        return <h1>Loading...</h1>
    }
    if (error) {
        alert(error)
    }
    const users: any = data?.getUsers;
    

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {users?.map((user: any, index: number) => (
        <div key={index}>
              <h1>id----{ user.id}</h1>
              <h1>Email -----{ user.Email}</h1>
        </div>
      ))}
   <Link href='/todo'><button>Create Todo</button></Link>
    </main>
  );
}
