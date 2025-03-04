import React from 'react'

function UserDetail() {
  return (
    <div className=''>
        <div className='border'>
            <table className="table table-bordered text-center">
                <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Category</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>John Doe</td>
                    <td>johndoe@example.com</td>
                    <td>Admin</td>
                    <td>
                    <button className='btn btn-primary'>Edit</button>
                    </td>
                    <td>
                    <button className='btn btn-danger'>Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default UserDetail
