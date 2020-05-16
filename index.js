function getAnalytics() {
    let repVal = document.getElementById("search-input");
    let term = repVal.value;
    console.log(term.replace(/\s+/g, ''))
    axios.get(`https://api.github.com/repos/${term.replace(/\s+/g, '')}/releases`)
        .then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
        }).then(data => {
            const asset_downloads = data.map(release => {
                return {
                    name: release.tag_name,
                    assets: release.assets.map(({ name, download_count }) => ({ name, download_count }))
                }
            });
            this.results = asset_downloads;

            let htmlString = [];
            asset_downloads.forEach(item => {
                let assets = item.assets.map(asset => {
                    return (
                        `<div class='card asset'>
                            Name of Asset: <strong>${asset.name}</strong><br>
                            <p class="font-black">Downloads: ${asset.download_count}</p>
                        </div>`
                    )
                })
                htmlString.push(
                    `<div class="px-6 py-6 card">
                                <div class="font-bold text-xl mb-2"><u>Tag: ${item.name}</u></div>
                                <div class='assets'>
                                    ${assets.join('')}
                                </div>
                            </div>`
                )
            })
            document.querySelector("#main").innerHTML = htmlString.join('');
            return asset_downloads;
        })
}