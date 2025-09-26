export default function Hari1() {
  return(
    <select
      id="sesi"
      name="sesi"
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      required
    >
      <option value="" disabled>-- Pilih Sesi --</option>
      <option value="1">Sesi AAA</option>
      <option value="2">Sesi BBB</option>
      <option value="3">Sesi CCC</option>
    </select>
  )
}
