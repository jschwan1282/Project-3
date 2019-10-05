# from datapackage import Package

# package = Package('https://datahub.io/core/geo-countries/datapackage.json')

# # print list of all resources:
# print(package.resource_names)

# # print processed tabular data (if exists any)
# for resource in package.resources:
#     if resource.descriptor['datahub']['type'] == 'derived/csv':
#         print(resource.read())
import requests


URL = "countries.geojson"


def getGeoData():
    r = requests.get(URL)
    # data = r.text
    # RESULTS = {'children': []}
    # for line in csv.DictReader(data.splitlines(), skipinitialspace=True):
    #     RESULTS['children'].append({
    #         'name': line['Name'],
    #         'symbol': line['Symbol'],
    #         'symbol': line['Symbol'],
    #         'price': line['lastsale'],
    #         'net_change': line['netchange'],
    #         'percent_change': line['pctchange'],
    #         'volume': line['share_volume'],
    #         'value': line['Nasdaq100_points']
    #     })
    # return RESULTS
    return r