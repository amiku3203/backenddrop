import React from 'react'
import Search from "@/app/ui/dashboard/search/search"
import styles from "@/app/ui/dashboard/users/user.module.css"
import Link from 'next/link'
const UsersPage = ({placeholder}) => {
  return (
     <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Seearch for a user... " />
        <Link href="/dashboard/users/add">
         <button className={styles.addButton}> Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
      <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
      
      </table>
     </div>
  )
}

export default UsersPage