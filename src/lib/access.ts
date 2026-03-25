import type { Access } from 'payload'

/** Any authenticated user (admin or editor). */
export const isLoggedIn: Access = ({ req: { user } }) => Boolean(user)

/** Admin role only. */
export const isAdmin: Access = ({ req: { user } }) =>
  Boolean(user && user.role === 'admin')

/** Admin or editor — can create and update, but editors cannot delete. */
export const isAdminOrEditor: Access = ({ req: { user } }) =>
  Boolean(user && (user.role === 'admin' || user.role === 'editor'))

/**
 * Public read access for published documents; authenticated users see all.
 * Use on collections with a `status` field.
 */
export const publishedOrLoggedIn: Access = ({ req: { user } }) => {
  if (user) return true
  return { status: { equals: 'published' } }
}
