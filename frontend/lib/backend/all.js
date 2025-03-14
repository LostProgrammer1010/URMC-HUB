function displayAll(results, body) {
  console.log(results)
  if (results.users != null) {
    results.users.forEach(user => {
      displayUser(user, body)
    });
  }
  if (results.computer != null) {
    results.computers.forEach(computer => {
      displayComputer(computer, body)
    });
  }

  if (results.groups != null) {
    results.groups.forEach(group => {
      displayGroup(group, body)
    });
  }

  if (results.printers != null) {
    results.printers.forEach(printer => {
      displayPrinter(printer, body)
    });
  }

  if (results.shares != null) {
    results.shares.forEach(share => {
      displayShareDrive(share, body)
    });
  }



}