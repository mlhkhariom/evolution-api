import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function AdminDashboardPage({ auth }) {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    useEffect(() => {
        axios.get(route('api.admin.users'))
            .then(response => {
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch users:', error);
            });
    }, []);

    const handleEdit = (user) => {
        setEditingUser({ ...user });
    };

    const handleSave = () => {
        axios.put(route('api.admin.user.update', { id: editingUser.id }), editingUser)
            .then(response => {
                setUsers(users.map(u => u.id === editingUser.id ? response.data : u));
                setEditingUser(null);
                alert('User updated successfully!');
            })
            .catch(error => {
                alert('Failed to update user.');
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingUser(prev => ({ ...prev, [name]: value }));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">User Management</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">License Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{user.licenseStatus}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <button onClick={() => handleEdit(user)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {editingUser && (
                 <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Edit User: {editingUser.email}</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">License Status</label>
                            <select name="licenseStatus" value={editingUser.licenseStatus} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="suspended">Suspended</option>
                            </select>
                        </div>
                         <div className="flex justify-end">
                            <button onClick={() => setEditingUser(null)} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-l">Cancel</button>
                            <button onClick={handleSave} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-r">Save</button>
                        </div>
                    </div>
                </div>
            )}
            <footer className="bg-white text-center py-4 mt-16">
                <p>Developed By MLHK infotech (Hariom Vishwkama)</p>
            </footer>
        </AuthenticatedLayout>
    );
}
