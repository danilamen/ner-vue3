export const deleteSelected = (initialArray, selectedArray) => {
  let newSelectedArray = [...selectedArray]

  const newArray = initialArray.filter((initialV) => {
    let filterFlag = true

    selectedArray.forEach((selectedV) => {
      if (selectedV.id === initialV.id) {
        filterFlag = false

        newSelectedArray = newSelectedArray.filter((s) => s.id !== selectedV.id)
      }
    })

    return filterFlag
  })

  return { newArray, newSelectedArray }
}
